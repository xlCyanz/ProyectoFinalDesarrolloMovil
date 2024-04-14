import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native";

import { useStores } from "app/models";
import { VolunteeringStackScreenProps } from "app/navigators"
import { Icon, ListItem, Screen, Text } from "../components"

import { spacing } from "../theme"
import { VolunteerNews } from "app/models/VolunteerNewsModel";

export const VolunteeringNewsDetailsScreen: React.FC<VolunteeringStackScreenProps<"VolunteeringNewsDetails">> = function EventDetails(
  { navigation, route },
) {
  const { volunteerStore } = useStores();

  const [news, setNews] = useState<VolunteerNews | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      const news = await volunteerStore.getOneNews(route.params.id);
      setNews(news)
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
      {news?.foto && (
        <Image source={{ uri: news?.foto ?? "" }} style={$itemThumbnail} />
      )}
      <View>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text>{news?.fecha}</Text>
              <Text preset="subheading">{news?.titulo}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text style={$textJustify}>{news?.contenido}</Text>
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