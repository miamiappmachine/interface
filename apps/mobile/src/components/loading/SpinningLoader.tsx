import React, { useEffect } from 'react'
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useAppTheme } from 'src/app/hooks'
import { AnimatedBox } from 'src/components/layout'
import Loader from 'ui/src/assets/icons/circle-spinner.svg'
import EmptySpinner from 'ui/src/assets/icons/empty-spinner.svg'
import { Theme } from 'ui/src/theme/restyle/theme'

export function SpinningLoader({
  size = 20,
  disabled,
  color,
}: {
  size?: number
  disabled?: boolean
  color?: keyof Theme['colors']
}): JSX.Element {
  const theme = useAppTheme()
  const rotation = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }
  }, [rotation.value])

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.bezier(0.83, 0, 0.17, 1),
      }),
      -1
    )
    return () => cancelAnimation(rotation)
  }, [rotation])

  if (disabled) {
    return <EmptySpinner color={theme.colors.DEP_textTertiary} height={size} width={size} />
  }
  return (
    <AnimatedBox sentry-label="SpinningLoader" style={[animatedStyles]}>
      <Loader color={theme.colors[color ?? 'DEP_textPrimary']} height={size} width={size} />
    </AnimatedBox>
  )
}
