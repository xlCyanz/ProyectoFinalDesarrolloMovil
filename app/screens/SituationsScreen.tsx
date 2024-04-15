import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, Dimensions, ImageStyle, View, ViewStyle } from "react-native"

import { spacing } from "../theme"
import { useStores } from "../models"
import { delay } from "../utils/delay"
import { ISituationOut } from "../services/api"
import { VolunteeringStackScreenProps } from "../navigators"
import { CardImage, EmptyState, Icon, ListView, Screen, Text } from "../components"

interface SituationsScreenProps extends VolunteeringStackScreenProps<"Situations"> { }

export const SituationsScreen: FC<SituationsScreenProps> = observer(function SituationsScreen({ navigation }) {
  const { volunteerStore } = useStores();

  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await volunteerStore.fetchSituations();
      setIsLoading(false);
    })()
  }, [volunteerStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([volunteerStore.fetchSituations(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={$screenContentContainer}>
      <ListView<ISituationOut>
        refreshing={refreshing}
        estimatedItemSize={120}
        estimatedListSize={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}
        contentContainerStyle={$listContentContainer}
        onRefresh={manualRefresh}
        ListHeaderComponent={
          <View>
            {navigation.canGoBack() ? (
              <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
            ) : null}
            <View>
              <Text testID="login-heading" tx="VolunteeringNavigator.situationsScreen.title" preset="heading" />
            </View>
          </View>
        }
        data={volunteerStore.situationsList.slice()}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <EmptyState
              preset="generic"
              contentTx="common.emptyStateTryAgain"
              buttonTx="common.emptyStateTryTap"
              buttonOnPress={manualRefresh}
              ImageProps={{ resizeMode: "contain" }}
              headingTx="VolunteeringNavigator.situationsScreen.emptyStateTitle"
            />
          )
        }
        renderItem={({ item }) => (
          <CardImage onPress={() => {
            navigation.navigate("SituationDetails", { id: item.id })
          }} title={`#${item.id} - ${item.titulo}`} subtitle={`${item.fecha.substring(0, 10)} - (${item.estado.toUpperCase()})`} photo="" source={{ uri: 'data:image/jpeg;base64,' + (item.foto ?? "") }} />
        )}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.md,
  paddingHorizontal: spacing.md,
}