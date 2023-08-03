import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { useAppTheme } from 'src/app/hooks'
import { Box, Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { theme as FixedTheme } from 'ui/src/theme/restyle/theme'
import { NftAssetTrait } from 'wallet/src/data/__generated__/types-and-hooks'

export function NFTTraitCard({
  trait,
  titleTextColor,
}: {
  trait: NftAssetTrait
  titleTextColor?: string
}): JSX.Element {
  const theme = useAppTheme()
  return (
    <Flex
      bg="DEP_textOnDimTertiary"
      borderRadius="rounded16"
      gap="spacing4"
      px="spacing16"
      py="spacing12">
      <Text
        style={{ color: titleTextColor ?? theme.colors.DEP_textSecondary }}
        variant="buttonLabelMicro">
        {trait.name}
      </Text>
      <Text color="DEP_textOnBrightPrimary" variant="subheadSmall">
        {trait.value}
      </Text>
    </Flex>
  )
}

export function NFTTraitList({
  traits,
  titleTextColor = 'DEP_textPrimary',
}: {
  traits: NftAssetTrait[]
  titleTextColor?: string
}): JSX.Element {
  function renderItem(item: ListRenderItemInfo<NftAssetTrait>): JSX.Element {
    return <NFTTraitCard titleTextColor={titleTextColor} trait={item.item} />
  }

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      contentContainerStyle={Styles.listContainer}
      data={traits}
      horizontal={true}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  )
}

function Separator(): JSX.Element {
  return <Box width={FixedTheme.spacing.spacing8} />
}

const Styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: FixedTheme.spacing.spacing24,
  },
})
