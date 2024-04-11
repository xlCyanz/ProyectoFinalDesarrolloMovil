import React, { FC, useEffect, useRef, useState } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Drawer } from "react-native-drawer-layout"
import { type ContentStyle } from "@shopify/flash-list"

import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { MainTabScreenProps } from "app/navigators"
import { DrawerIconButton, ListItem, ListView, ListViewRef, Screen, Text } from "../components"
import { observer } from "mobx-react-lite"

const logo = require("../../assets/images/logo.png")

interface DemoListItem {
  onPress?: (screenName: string) => void;
  item: { name: string; useCases: string[] }
}

const ShowroomListItem: FC<DemoListItem> = ({ item, onPress }) => (
  <View>
    <Text preset="bold" style={$menuContainer}>{item.name}</Text>
    {item.useCases.map((u, index) => (
      <ListItem
        key={`section${index}-${u}`}
        onPress={() => onPress?.(u)}
        text={u}
        rightIcon="caretRight"
      />
    ))}
  </View>
)

interface HomeScreenProps extends MainTabScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const menuRef = useRef<ListViewRef<DemoListItem["item"]>>(null)

  const [open, setOpen] = useState(false)

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

  const $drawerInsets = useSafeAreaInsetsStyle(["top"]);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType={"slide"}
      drawerPosition="left"
      renderDrawerContent={() => (
        <View style={[$drawer, $drawerInsets]}>
          <View style={$logoContainer}>
            <Image source={logo} style={$logoImage} />
          </View>
          <ListView<DemoListItem["item"]>
            ref={menuRef}
            contentContainerStyle={$listContentContainer}
            estimatedItemSize={250}
            data={[{
              name: "Menu",
              useCases: ["Historia", "Servicios", "Noticias", "Videos", "Albergues", "Mapas de Albergues", "Medidas Preventivas", "Miembros"]
            }]}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <ShowroomListItem {...{
                item,
                sectionIndex,
                onPress: (screenName) => {
                  toggleDrawer();
                  console.log("DrawerPress", screenName)
                }
              }} />
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
        <DrawerIconButton onPress={toggleDrawer} />
        <View style={$heading}>
          <Text preset="heading" tx="demoShowroomScreen.jumpStart" />
        </View>
        <Text>Dale</Text>
      </Screen>
    </Drawer>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  // paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.xxxl,
}