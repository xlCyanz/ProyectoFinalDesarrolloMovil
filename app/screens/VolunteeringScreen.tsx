import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ContentStyle } from "@shopify/flash-list"
import { Drawer } from "react-native-drawer-layout"
import { ActivityIndicator, FlatList, TextStyle, View, ViewStyle } from "react-native"

import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { colors, spacing } from "app/theme"
import { IVolunteerNews } from "app/services/api"
import { VolunteeringStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { CardImage, DrawerIconButton, DrawerListItem, EmptyState, IDrawerListItemProps, Icon, ListView, ListViewRef, Screen, Text } from "app/components"

interface VolunteeringScreenProps extends VolunteeringStackScreenProps<"Volunteering"> { }

const screens = [
  {
    label: "Reportar Situación", name: ""
  },
  {
    label: "Mis Situaciones", name: ""
  },
  {
    label: "Mapa de Situaciones", name: ""
  },
  {
    label: "Cambiar Contraseña", name: "ChangePassword"
  },
]

export const VolunteeringScreen: FC<VolunteeringScreenProps> = observer(function VolunteeringScreen({ navigation }) {
  const { volunteerStore } = useStores();

  const $drawerInsets = useSafeAreaInsetsStyle(["top"]);
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const menuRef = useRef<ListViewRef<IDrawerListItemProps["item"]>>(null)

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      await volunteerStore.fetchNews();
      setIsLoading(false);
    })()
  }, [volunteerStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([volunteerStore.fetchNews(), delay(750)]);
    setRefreshing(false);
  }

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType={"slide"}
      drawerPosition="left"
      renderDrawerContent={() => (
        <View style={[$drawer, $drawerInsets]}>
          <ListView<IDrawerListItemProps["item"]>
            ref={menuRef}
            contentContainerStyle={$listContentContainer}
            estimatedItemSize={219}
            data={[{
              name: "Menu de voluntarios",
              cases: screens
            }]}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <DrawerListItem {...{
                item,
                sectionIndex,
                onPress: (screenName) => {
                  if (screenName) {
                    navigation.navigate(screenName as never)
                  }
                  toggleDrawer();
                }
              }} />
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} style={$screenContentContainer}>
        <View style={$buttonContainer}>
          <DrawerIconButton onPress={toggleDrawer} />
          <Icon style={{ marginRight: spacing.md }} size={24} icon="logout" onPress={volunteerStore.logout} />
        </View>
        <View style={$listContainer}>
          <Text testID="login-heading" tx="MainNavigator.volunteeringScreen.welcomeVolunteers" preset="heading" style={$signInScreen} />
          <Text tx="MainNavigator.volunteeringScreen.newsListTitle" preset="subheading" style={$enterDetails} />
        </View>
        <FlatList<IVolunteerNews>
          contentContainerStyle={$listContentContainer}
          data={volunteerStore.newsList.slice()}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator size={50} />
            ) : (
              <EmptyState
                preset="generic"
                headingTx="MainNavigator.volunteeringScreen.emptyStateTitle"
                contentTx="MainNavigator.volunteeringScreen.emptyStateSubtitle"
                button="Intentar de nuevo"
                buttonOnPress={manualRefresh}
                ImageProps={{ resizeMode: "contain" }}
              />
            )
          }
          renderItem={({ item }) => (
            <CardImage title={item.titulo} photo={item.foto} subtitle={item.fecha} onPress={() => {
              navigation.navigate("VolunteeringNewsDetails", { id: item.id })
            }} />
          )}
        />
      </Screen>
    </Drawer>
  )
})

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.lg,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
}

const $listContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
}

const $signInScreen: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}