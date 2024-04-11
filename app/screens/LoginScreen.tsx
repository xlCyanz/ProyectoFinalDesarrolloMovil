import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { Alert, TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, ControllerTextInput, Icon, Screen, Text, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { FormProvider, useForm } from "react-hook-form"

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

type FormValues = {
  dni: string;
  password: string;
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const authPasswordInput = useRef<TextInput>(null)

  const { authenticationStore: { login } } = useStores();

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
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      <FormProvider {...methods}>
        <ControllerTextInput
          name="dni"
          inputMode="numeric"
          containerStyle={$textField}
          labelTx="loginScreen.inputs.dniFieldLabel"
          placeholderTx="loginScreen.inputs.dniFieldPlaceholder"
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />
        <ControllerTextInput
          name="password"
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isPasswordHidden}
          labelTx="loginScreen.inputs.passwordFieldLabel"
          placeholderTx="loginScreen.inputs.passwordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
        />
        <Button
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={methods.handleSubmit(async (values) => {
            const token = await login(values.dni, values.password);

            if (token) {
              Alert.alert("Registrado con éxito", "Seras enviado a iniciar sesión", [{
                text: "Ir", onPress: () => {
                  navigation.navigate("Login")
                }
              }])
            } else {
              Alert.alert("Hubo un error con la petición al servidor.")
            }
          }, () => Alert.alert("Hay errores en el formulario.", "Revisa los campos del formulario"))}
        />
      </FormProvider>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
