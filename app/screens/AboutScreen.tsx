import React from "react";
import * as Application from "expo-application";
import { TextStyle, View, ViewStyle } from "react-native";
// Image, ImageStyle,
import { MainTabScreenProps } from "app/navigators"

import { spacing } from "../theme"
import { ListItem, Screen, Text } from "../components"

export const AboutScreen: React.FC<MainTabScreenProps<"About">> = function AboutScreen(
  _props,
) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="MainNavigator.aboutScreen.tabBarTitle" />
      {/* <Image source={require("../../assets/images/contact-image.jpg")} style={$itemThumbnail} /> */}
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Nombre de la aplicación</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Version de la aplicación</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Desarrollador</Text>
              <Text>Johan Ezequiel Sierra Linares (2020-9997)</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Desarrollador</Text>
              <Text>Dervin Ransiel Mendez Jimenez (2020-10715)</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Desarrollador</Text>
              <Text>Jesús Ramón Ortiz Beriguete (2019-8124)</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Desarrollador</Text>
              <Text>Felix Ramón Duran (2019-7905)</Text>
            </View>
          }
        />
        {/* <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Desarrollador</Text>
              <Text>Johan Ezequiel Sierra Linares (2020-9997)</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Desarrollador</Text>
              <Text>Johan Ezequiel Sierra Linares (2020-9997)</Text>
            </View>
          }
        /> */}
        {/* <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Matricula del delegado</Text>
              <Text>2020-9997</Text>
            </View>
          }
        /> */}
      </View>
      <View style={$buttonContainer}>
        {/* <Button style={$button} tx="common.logOut" onPress={logout} /> */}
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

// const $itemThumbnail: ImageStyle = {
//   width: 150,
//   height: 150,
//   marginBottom: 10,
//   borderRadius: 100,
//   alignSelf: "center",
// }