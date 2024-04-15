import React, { FC, useEffect, useRef, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Drawer } from "react-native-drawer-layout"
import Onboarding from 'react-native-onboarding-swiper';
import { type ContentStyle } from "@shopify/flash-list"

import { colors, spacing } from "../theme"
import { MainTabScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { DrawerIconButton, ListItem, ListView, ListViewRef, Screen, Text } from "../components"

const logo = require("../../assets/images/logo.png")

interface DemoListItem {
  onPress?: (screenName: string) => void;
  item: { name: string; cases: { label: string, name: string }[] }
}

const ShowroomListItem: FC<DemoListItem> = ({ item, onPress }) => (
  <View>
    <Text preset="bold" style={$menuContainer}>{item.name}</Text>
    {item.cases.map((c, index) => (
      <ListItem
        text={c.label}
        rightIcon="caretRight"
        key={`section${index}-${c.name}`}
        onPress={() => onPress?.(c.name)}
      />
    ))}
  </View>
)

interface HomeScreenProps extends MainTabScreenProps<"Home"> { }

interface CustomPage {
  title: string;
  image: any,
  subtitle: string;
}

const pages: CustomPage[] = [
  {
    image: require("../../assets/images/onboarding-actions.png"),
    title: "Acciones importantes",
    subtitle: "En la defensa civil hay varias acciones o tareas importantes que se llevan a cabo.",
  },
  {
    image: require("../../assets/images/evacuation.webp"),
    title: "Evacuación",
    subtitle: "Es la acción de trasladar a las personas de un lugar de riesgo a uno seguro durante una emergencia, como un terremoto, incendio o inundación, con el objetivo de preservar vidas y minimizar daños.",
  },
  {
    image: require("../../assets/images/onboarding-actions.png"),
    title: "Habilitación y organización de refugios",
    subtitle: "Implica la preparación de espacios seguros para albergar a las personas evacuadas durante una emergencia, proporcionando condiciones básicas de seguridad, alimentación, atención médica y apoyo psicológico temporal.",
  },
  {
    image: require("../../assets/images/onboarding-actions.png"),
    title: "Salvamento",
    subtitle: "Consiste en el rescate y la asistencia a personas atrapadas, heridas o en peligro durante una emergencia, utilizando técnicas y equipos especializados para garantizar su supervivencia y bienestar.",
  },
  {
    image: require("../../assets/images/extintor.webp"),
    title: "Lucha contra incendios",
    subtitle: "Consiste en el rescate y la asistencia a personas atrapadas, heridas o en peligro durante una emergencia, utilizando técnicas y equipos especializados para garantizar su supervivencia y bienestar.",
  },
];

const screens = [
  {
    label: "Historia", name: "History"
  },
  {
    label: "Servicios", name: "Services"
  },
  {
    label: "Noticias", name: "News"
  },
  {
    label: "Videos", name: "Videos"
  },
  {
    label: "Albergues", name: "Hostels"
  },
  {
    label: "Mapas de Albergues", name: "HostelsMap"
  },
  {
    label: "Medidas Preventivas", name: "Measures"
  },
  {
    label: "Miembros", name: "Members"
  },
]

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const onboardingRef = useRef<Onboarding>(null);
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
              cases: screens
            }]}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <ShowroomListItem {...{
                item,
                sectionIndex,
                onPress: (screenName) => {
                  navigation.navigate(screenName as never)
                  toggleDrawer();
                }
              }} />
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
        <DrawerIconButton onPress={toggleDrawer} />
        <Onboarding
          ref={onboardingRef}
          showSkip={false}
          showPagination={pages.length >= 2}
          showDone={false}
          skipLabel={<Text>Saltar</Text>}
          nextLabel={<Text>Siguiente</Text>}
          containerStyles={$boardingContainer}
          imageContainerStyles={$imageContainerStyles}
          pages={
            pages.map((customPage) => ({
              backgroundColor: "transparent",
              image: <Image style={$onboardingPageImage} source={customPage.image} />,
              title: <Text preset="subheading" style={$onboardingPageTitle} size="xl">{customPage.title}</Text>,
              subtitle: <Text style={$onboardingPageSubtitle}>{customPage.subtitle}</Text>,
            }))
          }
        />
      </Screen>
    </Drawer>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $boardingContainer: ViewStyle = {
  flex: 1,
  paddingTop: spacing.xxl,
  justifyContent: "flex-start",
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
  height: 77,
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

const $onboardingPageTitle: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.xl,
}

const $onboardingPageSubtitle: TextStyle = {
  textAlign: "justify",
}

const $onboardingPageImage: ImageStyle = {
  width: 200,
  height: 200,
  objectFit: "cover",
}

const $imageContainerStyles: ViewStyle = {
  paddingBottom: 50
}