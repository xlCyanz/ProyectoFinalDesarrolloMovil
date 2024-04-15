import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, FlatList, ImageStyle, ViewStyle } from "react-native"

import { spacing } from "app/theme"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { ISituationOut } from "app/services/api"
import { VolunteeringStackScreenProps } from "app/navigators"
import { CardImage, EmptyState, Icon, Screen, Text } from "app/components"

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
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text testID="login-heading" tx="VolunteeringNavigator.situationsScreen.title" preset="heading" />
      <FlatList<ISituationOut>
        refreshing={refreshing}
        onRefresh={manualRefresh}
        data={volunteerStore.situationsList.slice()}
        contentContainerStyle={$listContentContainer}
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

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.lg,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}