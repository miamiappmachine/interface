import { Accounts } from '../utils/fixtures'
import { ElementName } from '../../src/features/telemetry/constants'
import { device, element, by } from 'detox'
import { sleep } from '../../src/utils/timing'

/** Opens Account page and imports a managed account */
export async function quickOnboarding() {
  await device.setBiometricEnrollment(true)

  await element(by.id(ElementName.OnboardingImportWallet)).tap()

  await element(by.id(ElementName.Manage)).tap()
  await element(by.id(ElementName.ImportAccount)).tap()

  // enter address / eth
  await element(by.id('import_account_form/input')).typeText(Accounts.managed.privateKey)
  await sleep(500)
  await element(by.id(ElementName.Submit)).tap()

  await device.matchFace()

  // enter account name
  await element(by.id('import_account_form/input')).typeText(Accounts.managed.name)
  await element(by.id(ElementName.Submit)).tap()
}

export async function maybeDismissTokenWarning() {
  try {
    await element(by.id(ElementName.TokenWarningAccept)).tap()
  } catch (e) {
    // no-op
  }
}
