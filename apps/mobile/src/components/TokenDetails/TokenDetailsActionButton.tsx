import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from 'src/app/hooks'
import { ButtonEmphasis, ButtonSize } from 'src/components/buttons/Button'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { getButtonProperties } from 'src/components/buttons/utils'
import { Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import Trace from 'src/components/Trace/Trace'
import { ElementName } from 'src/features/telemetry/constants'
import { getContrastPassingTextColor } from 'src/utils/colors'

export function TokenDetailsActionButtons({
  onPressSwap,
  tokenColor,
}: {
  onPressSwap?: () => void
  tokenColor?: Maybe<string>
}): JSX.Element {
  const { t } = useTranslation()
  const theme = useAppTheme()

  const { textVariant, paddingX, paddingY, borderRadius, borderColor } = getButtonProperties(
    ButtonEmphasis.Secondary,
    ButtonSize.Large
  )

  return (
    <Flex
      row
      bg="DEP_background0"
      borderTopColor="DEP_backgroundOutline"
      borderTopWidth={1}
      gap="spacing8"
      pb="spacing16"
      pt="spacing12"
      px="spacing16">
      <Trace logPress element={ElementName.Swap}>
        <TouchableArea
          hapticFeedback
          alignItems="center"
          borderColor={borderColor}
          borderRadius={borderRadius}
          borderWidth={1}
          disabled={!onPressSwap}
          flexGrow={1}
          px={paddingX}
          py={paddingY}
          style={{ backgroundColor: tokenColor ?? theme.colors.DEP_magentaVibrant }}
          onPress={onPressSwap}>
          <Text
            color={tokenColor ? getContrastPassingTextColor(tokenColor) : 'DEP_textOnBrightPrimary'}
            variant={textVariant}>
            {t('Swap')}
          </Text>
        </TouchableArea>
      </Trace>
    </Flex>
  )
}
