import {
  backgroundColor,
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
  typography,
  TypographyProps,
  useRestyle,
  useTheme,
} from '@shopify/restyle'
import React, { forwardRef } from 'react'
import { TextInput as TextInputBase, TextInputProps as BaseTextInputProps } from 'react-native'
import { Theme } from 'ui/src/theme/restyle/theme'

const restyleFunctions = [
  layout,
  typography,
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  color,
]
type RestyleProps = TypographyProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme>

export type TextInputProps = RestyleProps & BaseTextInputProps

export const TextInput = forwardRef<TextInputBase, TextInputProps>(function _TextInput(
  { onChangeText, onBlur, ...rest },
  ref
) {
  const theme = useTheme<Theme>()

  // Set defaults for style values
  rest.backgroundColor ??= 'DEP_background0'
  rest.px ??= 'spacing16'
  rest.py ??= 'spacing12'
  rest.color ??= 'DEP_textPrimary'
  rest.borderRadius ??= 'rounded12'

  // restyle doesn't parse placeholderTextColorCorrectly
  rest.placeholderTextColor ??= theme.colors.DEP_textTertiary

  const transformedProps = useRestyle(restyleFunctions, rest)

  return (
    <TextInputBase
      ref={ref}
      autoComplete="off"
      selectionColor={theme.colors.DEP_textTertiary}
      onBlur={onBlur}
      onChangeText={onChangeText}
      {...transformedProps}
    />
  )
})
