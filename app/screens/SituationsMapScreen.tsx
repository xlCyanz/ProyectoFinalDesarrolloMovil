import React, { FC } from "react"
import { ImageStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { spacing } from "../theme"
import { Icon, Screen, Text, } from "../components"
import { VolunteeringStackScreenProps } from "app/navigators"
import MapView, { Marker } from "react-native-maps"
import { useStores } from "app/models"

interface SituationsMapScreenProps extends VolunteeringStackScreenProps<"SituationsMap"> { }

export const SituationsMapScreen: FC<SituationsMapScreenProps> = observer(function SituationsMapScreen({ navigation }) {
  const { volunteerStore } = useStores();

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text text="Mapa situaciones" preset="heading" />
      <MapView
        initialRegion={{
          latitude: parseInt(volunteerStore.situationsList[0].latitud) ?? 50,
          longitude: parseInt(volunteerStore.situationsList[0].longitud) ?? -70,
          latitudeDelta: 4.425,
          longitudeDelta: 3.552,
        }}
        style={$mapView}
      >
        {volunteerStore.situationsList.length &&
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