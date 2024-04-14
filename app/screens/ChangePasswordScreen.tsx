import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import React, { ComponentType, FC, useMemo, useState } from "react"
import { ActivityIndicator, Alert, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Button, ControllerTextInput, Icon, Screen, Text, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { VolunteeringStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface ChangePasswordScreenProps extends VolunteeringStackScreenProps<"ChangePassword"> { }

type FormValues = {
  oldPassword: string;
  newPassword: string;
}

export const ChangePasswordScreen: FC<ChangePasswordScreenProps> = observer(function ChangePasswordScreen({ navigation }) {
  const { volunteerStore: { changePassword } } = useStores();

  const methods = useForm<FormValues>();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text testID="change-password-heading" tx="MainNavigator.changePasswordScreen.tabBarTitle" preset="heading" style={$heading} />
      <Text tx="MainNavigator.changePasswordScreen.subtitle" preset="subheading" style={$subtitle} />
      <FormProvider {...methods}>
        <ControllerTextInput
          name="oldPassword"
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isPasswordHidden}
          rules={{ required: "Campo requerido" }}
          labelTx="MainNavigator.changePasswordScreen.inputs.oldPasswordFieldLabel"
          placeholderTx="MainNavigator.changePasswordScreen.inputs.oldPasswordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
        />
        <ControllerTextInput
          name="newPassword"
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isPasswordHidden}
          rules={{ required: "Campo requerido" }}
          labelTx="MainNavigator.changePasswordScreen.inputs.newPasswordFieldLabel"
          placeholderTx="MainNavigator.changePasswordScreen.inputs.newPasswordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
        />
        {methods.formState.isSubmitting ? <ActivityIndicator size={50} /> : (
          <Button
            testID="change-password-button"
            style={$tapButton}
            preset="reversed"
            tx="MainNavigator.changePasswordScreen.tapToChange"
            onPress={methods.handleSubmit(async (values) => {
              const isSignedIn = await changePassword(values.oldPassword, values.newPassword);

              if (isSignedIn.success) {
                Alert.alert("Contraseña cambiada con éxito.", "Seras enviado a iniciar sesión");
              } else {
                Alert.alert("Hubo un error con la petición al servidor.", isSignedIn.message ?? "")
              }
            }, () => Alert.alert("Hay errores en el formulario.", "Revisa los campos del formulario"))}
          />
        )}
      </FormProvider>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $heading: TextStyle = {
  marginBottom: spacing.sm,
}

const $subtitle: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}