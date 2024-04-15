import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, FlatList, ImageStyle, ViewStyle } from "react-native"

import { spacing } from "app/theme"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { IPrecautionaryMeasures } from "app/services/api"
import { AppStackScreenProps } from "app/navigators"
import { CardImage, EmptyState, Icon, Screen, Text } from "app/components"

interface MeasuresScreenProps extends AppStackScreenProps<"Measures"> { }

export const MeasuresScreen: FC<MeasuresScreenProps> = observer(function MeasuresScreen({ navigation }) {
  const { measuresStore } = useStores();

  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await measuresStore.fetchMeasures();
      setIsLoading(false);
    })()
  }, [measuresStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([measuresStore.fetchMeasures(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={$screenContentContainer}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text testID="login-heading" tx="MainNavigator.measuresScreen.title" preset="heading" />
      <FlatList<IPrecautionaryMeasures>
        refreshing={refreshing}
        onRefresh={manualRefresh}
        data={measuresStore.measuresList.slice()}
        contentContainerStyle={$listContentContainer}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <EmptyState
              preset="generic"
              headingTx="MainNavigator.measuresScreen.emptyStateTitle"
              contentTx="common.emptyStateTryAgain"
              buttonTx="common.emptyStateTryTap"
              buttonOnPress={manualRefresh}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <CardImage onPress={() => {
            navigation.navigate("MeasureDetails", { id: item.id })
          }} title={item.descripcion.substring(0, 100).concat("...")} subtitle="" photo={item.foto} />
        )}
      />
    </Screen>
  )
})

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.xl,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}