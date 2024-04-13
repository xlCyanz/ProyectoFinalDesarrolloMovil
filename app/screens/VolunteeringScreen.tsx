import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"

import { spacing } from "app/theme"
import { Screen, Text } from "app/components"
import { MainTabScreenProps } from "app/navigators"

interface VolunteeringScreenProps extends MainTabScreenProps<"Volunteering"> { }

export const VolunteeringScreen: FC<VolunteeringScreenProps> = observer(function VolunteeringScreen() {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text text="Volunteering" />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}