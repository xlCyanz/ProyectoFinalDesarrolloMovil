import React, { FC } from "react"
import { ImageStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { spacing } from "../theme"
import { Icon, Screen, Text, } from "../components"
import { AppStackScreenProps } from "app/navigators"
import MapView, { Marker } from "react-native-maps"
import { useStores } from "app/models"

interface HostelsMapScreenProps extends AppStackScreenProps<"HostelsMap"> { }

export const HostelsMapScreen: FC<HostelsMapScreenProps> = observer(function HostelsMapScreen({ navigation }) {
  const { hostelStore } = useStores();

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text text="Mapa de albergues" preset="heading" />
      <MapView
        initialRegion={{
          latitude: 18,
          longitude: -70,
          latitudeDelta: 4.425,
          longitudeDelta: 3.552,
        }}
        style={$mapView}
      >
        {hostelStore.hostelsList.length &&
          hostelStore.hostelsList.map(rf => {
            return (
              <Marker
                coordinate={{
                  latitude: Number(rf.lng),
                  longitude: Number(rf.lat),
                }}
                title={`${rf.edificio} - ${rf.ciudad}`}
                description={`${rf.capacidad ?? "0 personas"}`}
                key={rf.codigo}
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