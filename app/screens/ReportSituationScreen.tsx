import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as ImagePicker from 'expo-image-picker';
import { FormProvider, useForm } from "react-hook-form"
import { ActivityIndicator, Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { spacing } from "../theme"
import { useStores } from "../models"
import { VolunteeringStackScreenProps } from "../navigators"
import { Button, ControllerTextInput, Icon, Screen, Text } from "../components"

interface ReportSituationScreenProps extends VolunteeringStackScreenProps<"ReportSituation"> { }

type FormValues = {
  title: string;
  latitude: string;
  longitude: string;
  description: string;
  photoBase64: string;
}

export const ReportSituationScreen: FC<ReportSituationScreenProps> = observer(function ReportSituationScreen({ navigation }) {
  const { volunteerStore: { reportSituation } } = useStores();

  const methods = useForm<FormValues>();

  const [photo, setPhoto] = React.useState("");

  return (
    <Screen
      preset="auto"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text tx="VolunteeringNavigator.reportSituationScreen.tabBarTitle" preset="heading" />
      <Text tx="VolunteeringNavigator.reportSituationScreen.enterDetails" preset="subheading" style={$enterDetails} />
      <FormProvider {...methods}>
        <ControllerTextInput
          name="title"
          containerStyle={$textField}
          rules={{ required: "error_required" }}
          labelTx="VolunteeringNavigator.reportSituationScreen.inputs.titleFieldLabel"
          placeholderTx="VolunteeringNavigator.reportSituationScreen.inputs.titleFieldPlaceholder"
        />
        <ControllerTextInput
          name="description"
          containerStyle={$textField}
          rules={{ required: "error_required" }}
          labelTx="VolunteeringNavigator.reportSituationScreen.inputs.descriptionFieldLabel"
          placeholderTx="VolunteeringNavigator.reportSituationScreen.inputs.descriptionFieldPlaceholder"
        />
        <View style={$viewMargin}>
          {photo ? (
            <View>
              <Image style={$image} source={{ uri: 'data:image/jpeg;base64,' + (photo ?? "") }} />
              <Button text="Eliminar imagen" preset="filled" onPress={() => setPhoto("")} />
            </View>
          ) : (

            <Button
              preset="filled"
              text="Seleccionar foto"
              onPress={async () => {
                try {
                  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                  if (!granted) {
                    alert("Debes tener permiso para seleccionar una imagen");
                    return
                  }

                  const result = await ImagePicker.launchImageLibraryAsync({
                    quality: 0.5,
                    base64: true,
                    allowsMultipleSelection: false,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  });

                  if (result.assets?.length) {
                    setPhoto(`${result.assets?.[0].base64}`)
                  }
                } catch (error) {
                  console.log("Error al subir la imagen", error)
                }
              }}
            />
          )}
        </View>
        <ControllerTextInput
          name="latitude"
          inputMode="numeric"
          containerStyle={$textField}
          rules={{ required: "error_required" }}
          labelTx="VolunteeringNavigator.reportSituationScreen.inputs.latitudeFieldLabel"
          placeholderTx="VolunteeringNavigator.reportSituationScreen.inputs.latitudeFieldPlaceholder"
        />
        <ControllerTextInput
          name="longitude"
          inputMode="numeric"
          containerStyle={$textField}
          rules={{ required: "error_required" }}
          labelTx="VolunteeringNavigator.reportSituationScreen.inputs.longitudeFieldLabel"
          placeholderTx="VolunteeringNavigator.reportSituationScreen.inputs.longitudeFieldPlaceholder"
        />
        {methods.formState.isSubmitting ? <ActivityIndicator size={50} /> : (
          <Button
            testID="login-button"
            tx="VolunteeringNavigator.reportSituationScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={methods.handleSubmit(async (values) => {
              const response = await reportSituation({ ...values, photoBase64: photo });

              if (response.success) {
                Alert.alert("Situación reportada con éxito!", "Las autoridades próximamente la revisaran.");
                // navigation.navigate()
              } else {
                Alert.alert("Hubo un error con la petición al servidor.", response.message)
              }
            }, () => Alert.alert("Hay errores en el formulario.", "Revisa los campos del formulario"))}
          />)}
      </FormProvider>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.md,
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

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}

const $viewMargin: ViewStyle = {
  marginBottom: spacing.md,
}

const $image: ImageStyle = {
  height: 150,
  width: "100%",
}