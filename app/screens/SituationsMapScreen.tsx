import React, { FC } from "react"
import { ImageStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { spacing } from "../theme"
import { Icon, Screen, Text, } from "../components"
import { VolunteeringStackScreenProps } from "../navigators"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useStores } from "../models"
import { useFocusEffect } from "@react-navigation/native"

interface SituationsMapScreenProps extends VolunteeringStackScreenProps<"SituationsMap"> { }

export const SituationsMapScreen: FC<SituationsMapScreenProps> = observer(function SituationsMapScreen({ navigation }) {
  const { volunteerStore } = useStores();

  const firstLatitude = volunteerStore?.situationsList[0]?.latitud || "18";
  const firstLongitude = volunteerStore?.situationsList[0]?.longitud || "-70";

  useFocusEffect(() => {
    ; (async function load() {
      await volunteerStore.fetchSituations();
    })()
  })

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text text="Mapa situaciones" preset="heading" />
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitudeDelta: 4.425,
          longitudeDelta: 3.552,
          latitude: parseInt(firstLatitude),
          longitude: parseInt(firstLongitude),
        }}
        style={$mapView}
      >
        {!!volunteerStore.situationsList.length &&
          volunteerStore.situationsList.map(s => {
            return (
              <Marker
                coordinate={{
                  latitude: Number(s.latitud),
                  longitude: Number(s.longitud),
                }}
                key={s.id}
                title={`#${s.id} ${s.titulo}`}
                description={`${s.descripcion}`}
              />
            );
          })}
      </MapView>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}

const $mapView: ViewStyle = {
  width: '100%',
  height: '100%',
}