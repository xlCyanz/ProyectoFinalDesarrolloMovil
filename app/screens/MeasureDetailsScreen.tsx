import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native";

import { useStores } from "app/models";
import { AppStackScreenProps } from "app/navigators"
import { Icon, ListItem, Screen, Text } from "../components"

import { spacing } from "../theme"
import { IPrecautionaryMeasures } from "app/services/api";

export const MeasureDetailsScreen: React.FC<AppStackScreenProps<"MeasureDetails">> = function EventDetails(
  { navigation, route },
) {
  const { measuresStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);
  const [measure, setMeasure] = useState<IPrecautionaryMeasures | undefined>(undefined)

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      const data = await measuresStore.getOneMeasure(route.params.id)
      setMeasure(data)
      setIsLoading(false);
    })()
  }, [measuresStore])

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
      {measure?.foto && (
        <Image source={{ uri: measure.foto }} style={$itemThumbnail} />
      )}
      <View>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Descripción</Text>
              <Text style={$textJustify}>{measure?.descripcion}</Text>
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