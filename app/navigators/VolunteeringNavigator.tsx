import React from "react"
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"

import { useStores } from "app/models"
import * as Screens from "app/screens"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type VolunteeringStackParamList = {
  SignIn: undefined
  Volunteering: undefined
  ChangePassword: undefined
  VolunteeringNewsDetails: { id: string }
}

export type VolunteeringStackScreenProps<T extends keyof VolunteeringStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<VolunteeringStackParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >

const Stack = createNativeStackNavigator<VolunteeringStackParamList>()

export const VolunteeringNavigator = observer(() => {
  const {
    volunteerStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? "Volunteering" : "SignIn"}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Volunteering" component={Screens.VolunteeringScreen} />
          <Stack.Screen name="ChangePassword" component={Screens.ChangePasswordScreen} />
          <Stack.Screen name="VolunteeringNewsDetails" component={Screens.VolunteeringNewsDetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={Screens.SignInScreen} />
      )}
    </Stack.Navigator>
  )
})
