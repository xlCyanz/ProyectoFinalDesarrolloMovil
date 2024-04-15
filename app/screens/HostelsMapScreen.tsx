import React, { FC } from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { spacing } from "../theme"
import { Icon, Screen, Text, } from "../components"
import { AppStackScreenProps } from "../navigators"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useStores } from "../models"
import { useFocusEffect } from "@react-navigation/native"

interface HostelsMapScreenProps extends AppStackScreenProps<"HostelsMap"> { }

export const HostelsMapScreen: FC<HostelsMapScreenProps> = observer(function HostelsMapScreen({ navigation }) {
  const { hostelStore } = useStores();

  useFocusEffect(() => {
    ; (async function load() {
      await hostelStore.fetchHostels();
    })()
  })

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <View style={$screenHeaderContainer}>
        {navigation.canGoBack() ? (
          <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
        ) : null}
        <Text text="Mapa de albergues" preset="heading" />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 18,
          longitude: -70,
          latitudeDelta: 4.425,
          longitudeDelta: 3.552,
        }}
        style={$mapView}
      >
        {!!hostelStore.hostelsList.length &&
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
}

const $screenHeaderContainer: ViewStyle = {
  paddingHorizontal: spacing.md
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}

const $mapView: ViewStyle = {
  width: '100%',
  height: '100%',
}