import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native";

import { useStores } from "../models";
import { VolunteeringStackScreenProps } from "../navigators"
import { Icon, ListItem, Screen, Text } from "../components"

import { spacing } from "../theme"
import { ISituationOut } from "../services/api";

export const SituationDetailsScreen: React.FC<VolunteeringStackScreenProps<"SituationDetails">> = function EventDetails(
  { navigation, route },
) {
  const { volunteerStore } = useStores();

  const [situation, setSituation] = useState<ISituationOut | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      setSituation(await volunteerStore.getOneSituation(route.params.id))
      setIsLoading(false);
    })()
  }, [volunteerStore])

  if (isLoading) {
    return (
      <View style={$activityContainer}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      {situation?.foto && (
        <Image source={{ uri: 'data:image/jpeg;base64,' + (situation.foto ?? "") }} style={$itemThumbnail} />
      )}
      <View>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text>{situation?.fecha.substring(0, 10)}</Text>
              <Text preset="subheading">{situation?.titulo}</Text>
            </View>
          }
          RightComponent={
            <View style={$item}>
              <Text>{situation?.estado.toUpperCase()}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Descripción</Text>
              <Text style={$textJustify}>{situation?.descripcion}</Text>
            </View>
          }
        />
        <ListItem
          RightComponent={
            <View style={$item}>
              <Text preset="bold">Longitud</Text>
              <Text>{situation?.longitud}</Text>
            </View>
          }
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Latitud</Text>
              <Text>{situation?.latitud}</Text>
            </View>
          }
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $itemThumbnail: ImageStyle = {
  width: "100%",
  height: 200,
  marginBottom: 10,
  borderRadius: 10,
  alignSelf: "center",
}

const $activityContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "red"
}

const $textJustify: TextStyle = {
  textAlign: "justify"
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}