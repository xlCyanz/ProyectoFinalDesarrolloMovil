import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { spacing } from "app/theme"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { IVolunteerNews } from "app/services/api"
import { AppStackScreenProps } from "app/navigators"
import { CardImage, EmptyState, Icon, Screen, Text } from "app/components"
import { useFocusEffect } from "@react-navigation/native"

interface NewsScreenProps extends AppStackScreenProps<"News"> { }

export const NewsScreen: FC<NewsScreenProps> = observer(function NewsScreen({ navigation }) {
  const { newsStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await newsStore.fetchNews();
      setIsLoading(false);
    })()
  })

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([newsStore.fetchNews(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={$screenContentContainer}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <View>
        <Text testID="login-heading" tx="MainNavigator.newsScreen.title" preset="heading" style={$signInScreen} />
        <Text tx="MainNavigator.newsScreen.newsListTitle" preset="subheading" style={$enterDetails} />
      </View>
      <FlatList<IVolunteerNews>
        contentContainerStyle={$listContentContainer}
        data={newsStore.newsList.slice()}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <EmptyState
              preset="generic"
              buttonOnPress={manualRefresh}
              buttonTx="common.emptyStateTryTap"
              contentTx="common.emptyStateTryAgain"
              ImageProps={{ resizeMode: "contain" }}
              headingTx="MainNavigator.newsScreen.emptyStateTitle"
            />
          )
        }
        renderItem={({ item }) => (
          <CardImage title={item.titulo} photo={item.foto} subtitle={item.fecha} onPress={() => {
            navigation.navigate("NewsDetails", { id: item.id })
          }} />
        )}
      />
    </Screen>
  )
})

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.lg,
  paddingHorizontal: spacing.md,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $signInScreen: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}