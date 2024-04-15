import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, Dimensions, ImageStyle, View, ViewStyle } from "react-native"

import { spacing } from "../theme"
import { useStores } from "../models"
import { delay } from "../utils/delay"
import { IService } from "../services/api"
import { AppStackScreenProps } from "../navigators"
import { CardImage, EmptyState, Icon, ListView, Screen, Text } from "../components"

interface ServicesScreenProps extends AppStackScreenProps<"Services"> { }

export const ServicesScreen: FC<ServicesScreenProps> = observer(function ServicesScreen({ navigation }) {
  const { servicesStore } = useStores();

  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await servicesStore.fetchServices();
      setIsLoading(false);
    })()
  }, [servicesStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([servicesStore.fetchServices(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={$screenContentContainer}>
      <ListView<IService>
        refreshing={refreshing}
        estimatedItemSize={200}
        estimatedListSize={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}
        onRefresh={manualRefresh}
        data={servicesStore.servicesList.slice()}
        contentContainerStyle={$listContentContainer}
        ListHeaderComponent={
          <View>
            {navigation.canGoBack() ? (
              <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
            ) : null}
            <Text testID="login-heading" tx="MainNavigator.servicesScreen.title" preset="heading" />
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <EmptyState
              preset="generic"
              headingTx="MainNavigator.servicesScreen.emptyStateTitle"
              contentTx="common.emptyStateTryAgain"
              button="Intentar de nuevo"
              buttonOnPress={manualRefresh}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <CardImage title={item.descripcion.substring(0, 100).concat("...")} subtitle={item.nombre} photo={item.foto} />
        )}
      />
    </Screen>
  )
})

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.xxxl,
  paddingHorizontal: spacing.md,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row"
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}