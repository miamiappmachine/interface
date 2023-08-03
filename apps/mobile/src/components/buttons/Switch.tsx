import { SpacingProps, SpacingShorthandProps } from '@shopify/restyle'
import React from 'react'
import { Switch as BaseSwitch, SwitchProps, ViewProps } from 'react-native'
import { useAppTheme } from 'src/app/hooks'
import { Box } from 'src/components/layout/Box'
import { Theme } from 'ui/src/theme/restyle/theme'

type RestyleProps = SpacingProps<Theme> & SpacingShorthandProps<Theme>

type Props = {
  value: boolean
  onValueChange: (newValue: boolean) => void
  disabled?: boolean
} & RestyleProps &
  ViewProps &
  SwitchProps

// A themed switch toggle
export function Switch({ value, onValueChange, disabled, ...rest }: Props): JSX.Element {
  const theme = useAppTheme()

  return (
    <Box>
      <BaseSwitch
        ios_backgroundColor={theme.colors.DEP_background3}
        thumbColor={value ? theme.colors.DEP_accentAction : theme.colors.DEP_textSecondary}
        trackColor={{
          false: theme.colors.DEP_background3,
          true: theme.colors.DEP_background3,
        }}
        value={value}
        onValueChange={disabled ? undefined : onValueChange}
        {...rest}
      />
    </Box>
  )
}
