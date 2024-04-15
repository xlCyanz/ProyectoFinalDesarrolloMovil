import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Icon } from "../components"
import { translate } from "../i18n"
import * as Screens from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { VolunteeringNavigator, VolunteeringStackParamList } from "./VolunteeringNavigator"

export type MainTabParamList = {
  Home: undefined
  About: undefined
  VolunteeringStack: NavigatorScreenParams<VolunteeringStackParamList>
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<MainTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `MainNavigator`.
 */
export function MainNavigator(): JSX.Element {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          tabBarLabel: translate("MainNavigator.homeScreen.tabBarTitle"),
          tabBarIcon: ({ focused }) => (
            <Icon icon={focused ? "home-filled" : "home-outline"} color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="VolunteeringStack"
        component={VolunteeringNavigator}
        options={{
          tabBarLabel: translate("MainNavigator.volunteeringScreen.tabBarTitle"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="user-heart" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={Screens.AboutScreen}
        options={{
          tabBarLabel: translate("MainNavigator.aboutScreen.tabBarTitle"),
          tabBarIcon: ({ focused }) => (
            <Icon icon={focused ? "info-circle-filled" : "info-circle-outline"} color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}