import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button, Text } from "app/components"
import { colors, spacing } from "../theme"
import { AppStackScreenProps } from "../navigators"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  { navigation }) {

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.title"
          preset="heading"
        />
        <Text tx="welcomeScreen.subtitle" preset="subheading" />
      </View>
      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.access" size="md" />
        <Button preset="filled" onPress={() => {
          navigation.navigate("Main", { screen: "Home" })
        }}>Acceder</Button>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  gap: 15,
  flexGrow: 0,
  padding: 16,
  flexShrink: 1,
  flexBasis: "25%",
  borderTopLeftRadius: 16,
  justifyContent: "center",
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.palette.neutral100,
}
const $welcomeLogo: ImageStyle = {
  height: 200,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
