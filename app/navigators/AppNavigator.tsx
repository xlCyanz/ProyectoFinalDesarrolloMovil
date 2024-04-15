/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { observer } from "mobx-react-lite"
import { useColorScheme } from "react-native"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import { colors } from "app/theme"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { MainNavigator, MainTabParamList } from "./MainNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  News: undefined;
  NewsDetails: { id: string };
  Videos: undefined;
  Welcome: undefined;
  Members: undefined;
  Hostels: undefined;
  Services: undefined;
  Measures: undefined;
  MeasureDetails: { id: string };
  Register: undefined;
  HostelsMap: undefined;
  HostelDetails: { code: string };
  Main: NavigatorScreenParams<MainTabParamList>
  // 🔥 Your screens go here
  History: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
    >
      <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
      <Stack.Screen name="Register" component={Screens.RegisterScreen} />
      <Stack.Screen name="History" component={Screens.HistoryScreen} />
      <Stack.Screen name="Members" component={Screens.MembersScreen} />
      <Stack.Screen name="Hostels" component={Screens.HostelsScreen} />
      <Stack.Screen name="HostelDetails" component={Screens.HostelDetailsScreen} />
      <Stack.Screen name="HostelsMap" component={Screens.HostelsMapScreen} />
      <Stack.Screen name="News" component={Screens.NewsScreen} />
      <Stack.Screen name="NewsDetails" component={Screens.NewsDetailsScreen} />
      <Stack.Screen name="Services" component={Screens.ServicesScreen} />
      <Stack.Screen name="Videos" component={Screens.VideosScreen} />
      <Stack.Screen name="Measures" component={Screens.MeasuresScreen} />
      <Stack.Screen name="MeasureDetails" component={Screens.MeasureDetailsScreen} />
      {/* Navigators */}
      <Stack.Screen name="Main" component={MainNavigator} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
