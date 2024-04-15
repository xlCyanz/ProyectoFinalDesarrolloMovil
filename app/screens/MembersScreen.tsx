import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { ActivityIndicator, Dimensions, ImageStyle, View, ViewStyle } from "react-native"

import { spacing } from "../theme"
import { useStores } from "../models"
import { delay } from "../utils/delay"
import { IMember } from "../services/api"
import { AppStackScreenProps } from "../navigators"
import { CardImage, EmptyState, Icon, ListView, Screen, Text } from "../components"

interface MembersScreenProps extends AppStackScreenProps<"Members"> { }

export const MembersScreen: FC<MembersScreenProps> = observer(function MembersScreen({ navigation }) {
  const { memberStore } = useStores();

  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await memberStore.fetchMembers();
      setIsLoading(false);
    })()
  }, [memberStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([memberStore.fetchMembers(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={$screenContentContainer}>
      <ListView<IMember>
        refreshing={refreshing}
        onRefresh={manualRefresh}
        estimatedItemSize={100}
        estimatedListSize={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}
        data={memberStore.membersList.slice()}
        contentContainerStyle={$listContentContainer}
        ListHeaderComponent={
          <View>
            {navigation.canGoBack() ? (
              <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
            ) : null}
            <Text testID="login-heading" tx="MainNavigator.membersScreen.title" preset="heading" />
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <EmptyState
              preset="generic"
              headingTx="MainNavigator.membersScreen.emptyStateTitle"
              contentTx="common.emptyStateTryAgain"
              button="Intentar de nuevo"
              buttonOnPress={manualRefresh}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <CardImage title={item.nombre} subtitle={item.cargo} photo={item.foto} />
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
  paddingBottom: spacing.lg,
  paddingHorizontal: spacing.md,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}