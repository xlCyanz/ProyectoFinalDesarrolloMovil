import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageStyle, View, ViewStyle } from "react-native";

import { useStores } from "../models";
import { AppStackScreenProps } from "../navigators"
import { Icon, ListItem, Screen, Text } from "../components"

import { spacing } from "../theme"
import { Hostel } from "../models/HostelModel";

export const HostelDetailsScreen: React.FC<AppStackScreenProps<"HostelDetails">> = function EventDetails(
  { navigation, route },
) {
  const { hostelStore } = useStores();

  const [hostel, setHostel] = useState<Hostel | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true);
      const hostel = await hostelStore.getOneHostel(route.params.code);
      setHostel(hostel)
      setIsLoading(false);
    })()
  }, [hostelStore])

  if (isLoading) {
    return (
      <View style={$activityContainer}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text text={`Albergue ${hostel?.codigo}`} preset="heading" />
      <View style={$listContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Capacidad</Text>
              <Text>{hostel?.capacidad || "0 personas"}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Dirección</Text>
              <Text>{`${hostel?.edificio}, ${hostel?.ciudad}`}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Coordinador</Text>
              <Text>{`${hostel?.coordinador}`}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Teléfono</Text>
              <Text>{`${hostel?.telefono}`}</Text>
            </View>
          }
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $activityContainer: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  justifyContent: "center",
}

const $listContainer: ViewStyle = {
  paddingVertical: spacing.md,
};

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}