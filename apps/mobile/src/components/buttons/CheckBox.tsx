import { useResponsiveProp } from '@shopify/restyle'
import React from 'react'
import { useAppTheme } from 'src/app/hooks'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { Box, Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { useIsDarkMode } from 'src/features/appearance/hooks'
import Check from 'ui/src/assets/icons/check.svg'

export type CheckBoxProps = {
  checked: boolean
  text?: string | JSX.Element
  onCheckPressed?: (currentState: boolean) => void
}

export function CheckBox({ text, checked, onCheckPressed }: CheckBoxProps): JSX.Element {
  const theme = useAppTheme()
  const isDarkMode = useIsDarkMode()

  const onPress = (): void => {
    onCheckPressed?.(checked)
  }

  const fontSize = useResponsiveProp({
    xs: 'buttonLabelMicro',
    sm: 'subheadSmall',
  })

  return (
    <TouchableArea onPress={onPress}>
      <Flex row gap="spacing12">
        <Box
          alignItems="center"
          backgroundColor={checked ? 'DEP_textPrimary' : 'DEP_background1'}
          borderColor={checked ? 'DEP_textPrimary' : 'DEP_backgroundOutline'}
          borderRadius="roundedFull"
          borderWidth={1.5}
          height={theme.iconSizes.icon24}
          justifyContent="center"
          mt="spacing4"
          p="spacing2"
          width={theme.iconSizes.icon24}>
          {checked ? (
            <Check
              color={isDarkMode ? theme.colors.DEP_black : theme.colors.DEP_white}
              height={theme.iconSizes.icon16}
              width={theme.iconSizes.icon16}
            />
          ) : null}
        </Box>
        <Box flexShrink={1}>
          <Text variant={fontSize}>{text}</Text>
        </Box>
      </Flex>
    </TouchableArea>
  )
}
