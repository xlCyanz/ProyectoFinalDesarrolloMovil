import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, Dimensions, ImageStyle, View, ViewStyle } from "react-native"

import { spacing } from "../theme"
import { useStores } from "../models"
import { delay } from "../utils/delay"
import { IPrecautionaryMeasures } from "../services/api"
import { AppStackScreenProps } from "../navigators"
import { CardImage, EmptyState, Icon, ListView, Screen, Text } from "../components"

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
      <ListView<IPrecautionaryMeasures>
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListHeaderComponent={
          <View>
            {navigation.canGoBack() ? (
              <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
            ) : null}
            <Text testID="login-heading" tx="MainNavigator.measuresScreen.title" preset="heading" />
          </View>
        }
        estimatedItemSize={100}
        estimatedListSize={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}
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
          }} title={item.descripcion.substring(0, 100).concat("...")} subtitle={item.titulo ?? ""} photo={item.foto} />
        )}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
}

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.xl,
  paddingHorizontal: spacing.md,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}