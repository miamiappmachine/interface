import { createAction, createReducer, PayloadActionCreator } from '@reduxjs/toolkit'
import { call, delay, Effect, put, race, take } from 'redux-saga/effects'
import { pushNotification } from 'src/features/notifications/notificationSlice'
import { NotificationSeverity } from 'src/features/notifications/types'
import { logger } from 'src/utils/logger'
import { errorToString } from 'src/utils/validation'

/**
 * A convenience utility to create a saga and trigger action
 * Use to create simple sagas, for more complex ones use createMonitoredSaga.
 * Note: the wrapped saga this returns must be added to rootSaga.ts
 */
export function createSaga<SagaParams = void>(saga: (...args: any[]) => any, name: string) {
  const triggerAction = createAction<SagaParams>(`${name}/trigger`)

  const wrappedSaga = function* () {
    while (true) {
      try {
        const trigger: Effect = yield take(triggerAction.type)
        logger.debug('saga', 'wrappedSaga', `${name} triggered`)
        yield call(saga, trigger.payload)
      } catch (error) {
        logger.error('saga', 'wrappedSaga', `${name} error`, error)
      }
    }
  }

  return {
    wrappedSaga,
    actions: {
      trigger: triggerAction,
    },
  }
}

const DEFAULT_TIMEOUT = 90 * 1000 // 1.5 minutes

export enum SagaStatus {
  Started = 'SagaStarted',
  Success = 'SagaSuccess',
  Failure = 'SagaFailure',
}

export interface SagaActions {
  trigger: PayloadActionCreator<any>
  cancel: PayloadActionCreator<any>
  progress: PayloadActionCreator<any>
  error: PayloadActionCreator<any>
  reset: PayloadActionCreator<any>
}

export interface SagaState {
  status: SagaStatus | null
  error: string | null // error details
}

interface MonitoredSagaOptions {
  timeoutDuration?: number // in milliseconds
  suppressErrorNotification?: boolean // disable automatic showing of errors
  // If retry / or other options are ever needed, they can go here
}

/**
 * A convenience utility to create a wrapped saga that handles common concerns like
 * trigger watching, cancel watching, timeout, progress updates, and success/fail updates.
 * Use to create complex sagas that need more coordination with the UI.
 * Note: the wrapped saga and reducer this returns must be added to rootSaga.ts
 */
export function createMonitoredSaga<SagaParams = void>(
  saga: (params: SagaParams) => any,
  name: string,
  options?: MonitoredSagaOptions
) {
  const triggerAction = createAction<SagaParams>(`${name}/trigger`)
  const cancelAction = createAction<void>(`${name}/cancel`)
  const statusAction = createAction<SagaStatus>(`${name}/progress`)
  const errorAction = createAction<string>(`${name}/error`)
  const resetAction = createAction<void>(`${name}/reset`)

  const reducer = createReducer<SagaState>({ status: null, error: null }, (builder) =>
    builder
      .addCase(statusAction, (state, action) => {
        state.status = action.payload
        state.error = null
      })
      .addCase(errorAction, (state, action) => {
        state.status = SagaStatus.Failure
        state.error = action.payload
      })
      .addCase(resetAction, (state) => {
        state.status = null
        state.error = null
      })
  )

  const wrappedSaga = function* () {
    while (true) {
      try {
        const trigger: Effect = yield take(triggerAction.type)
        logger.debug('saga', 'monitoredSaga', `${name} triggered`)
        yield put(statusAction(SagaStatus.Started))
        const { result, cancel, timeout } = yield race({
          // Note: Use fork here instead if parallelism is required for the saga
          result: call(saga, trigger.payload),
          cancel: take(cancelAction.type),
          timeout: delay(options?.timeoutDuration || DEFAULT_TIMEOUT),
        })

        if (cancel) {
          logger.debug('saga', 'monitoredSaga', `${name} canceled`)
          yield put(errorAction('Action was cancelled.'))
          continue
        }

        if (timeout) {
          logger.warn('saga', 'monitoredSaga', `${name} timed out`)
          throw new Error('Action timed out.')
        }

        if (result === false) {
          logger.warn('saga', 'monitoredSaga', `${name} returned failure result`)
          throw new Error('Action returned failure result.')
        }

        yield put(statusAction(SagaStatus.Success))
        logger.debug('saga', 'monitoredSaga', `${name} finished`)
      } catch (error: any) {
        logger.error('saga', 'monitoredSaga', `${name} error`, error)
        const errorMessage = errorToString(error)
        yield put(errorAction(errorMessage))
        if (!options?.suppressErrorNotification) {
          yield put(
            pushNotification({ message: errorMessage, severity: NotificationSeverity.Error })
          )
        }
      }
    }
  }

  return {
    name,
    wrappedSaga,
    reducer,
    actions: {
      trigger: triggerAction,
      cancel: cancelAction,
      progress: statusAction,
      error: errorAction,
      reset: resetAction,
    },
  }
}
