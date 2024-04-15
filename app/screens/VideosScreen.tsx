import React, { useEffect, useState } from "react";
import { ContentStyle } from "@shopify/flash-list";
import YoutubePlayer from "react-native-youtube-iframe";
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators"

import { useStores } from "app/models";
import { IVideo } from "app/services/api"
import { delay } from "app/utils/delay";

import { colors, spacing } from "../theme"
import { EmptyState, Icon, ListItem, Screen, Text } from "../components"

export const VideosScreen: React.FC<AppStackScreenProps<"Videos">> = function VideosScreen(
  { navigation },
) {
  const { videosStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await videosStore.fetchVideos();
      setIsLoading(false);
    })()
  }, [videosStore]);

  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([videosStore.fetchVideos(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text style={$title} preset="heading" tx="MainNavigator.videosScreen.title" />
      <View>
        <FlatList<IVideo>
          refreshing={refreshing}
          onRefresh={manualRefresh}
          data={videosStore.videosList.slice()}
          contentContainerStyle={$listContentContainer}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator size={50} />
            ) : (
              <EmptyState
                preset="generic"
                headingTx="MainNavigator.hostelsScreen.emptyStateTitle"
                contentTx="common.emptyStateTryAgain"
                button="Intentar de nuevo"
                buttonOnPress={manualRefresh}
                ImageProps={{ resizeMode: "contain" }}
              />
            )
          }
          ItemSeparatorComponent={() => <View style={$br} />}
          renderItem={({ item }) => (
            <ListItem
              LeftComponent={
                <View style={$item}>
                  <Text preset="bold">{item.titulo}</Text>
                  <View>
                    <YoutubePlayer height={200} videoId={item.link ?? ""} />
                  </View>
                  <Text>{item.fecha}</Text>
                  <Text>{item.descripcion}</Text>
                </View>
              }
            />
          )}
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.md,
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.lg,
}

const $br: ViewStyle = {
  height: 2,
  width: "100%",
  backgroundColor: colors.separator,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}