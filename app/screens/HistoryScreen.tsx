import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { spacing } from "../theme"
import { AppStackScreenProps } from "../navigators"
import { Icon, Screen, Text } from "../components"

interface HistoryScreenProps extends AppStackScreenProps<"History"> { }

export const HistoryScreen: FC<HistoryScreenProps> = observer(function HistoryScreen({ navigation }) {
  return (
    <Screen safeAreaEdges={["bottom"]} preset="scroll" contentContainerStyle={$container}>
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text testID="register-heading" tx="historyScreen.tabBarTitle" preset="heading" style={$heading} />
      <Text style={$text}>
        Antes del año 1966, cuando llegaba la temporada de huracanes, un grupo de radioaficionados
        se reunía en la Cruz Roja para estar atentos por si surgía algún tipo de emergencia,
        inmediatamente ponerse a disposición y ayudar en todo lo posible, inclusive, usando sus
        propios equipos de comunicación para así tener contacto con el exterior en caso de que las
        redes telefónicas resultaran afectadas.
      </Text>
      <Text style={$text}>
        Al surgir el triunvirato fue designado el Dr. Rafael Cantizano Arias, como presidente de
        la Cruz Roja y al mismo tiempo nombraron al Ing. Carlos D´ Franco como director de la
        Defensa Civil, quien con un grupo compuesto por seis personas, se instaló en la calle
        Francia esquina Galván, siendo esa la primera oficina de la Defensa Civil.
      </Text>
      <Text style={$text}>
        Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García Godoy, a los
        diecisiete días del mes de junio de 1966, fue promulgada la Ley 257, mediante la cual
        fue creada la Defensa Civil, institución dependiente de la Secretaría Administrativa de
        la Presidencia (ahora Ministerio de la Presidencia) y quien en la actualidad preside la
        Comisión Nacional de Emergencias.
      </Text>
      <Text style={$text}>
        Más adelante, el local fue trasladado a la calle Dr. Delgado No. 164 y luego en
        la gestión del Contralmirante Radhamés Lora Salcedo se reubicó a la Plaza de la Salud,
        donde aún permanece.
      </Text>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingVertical: spacing.xl,
  paddingHorizontal: spacing.md,
}

const $text: TextStyle = {
  textAlign: "justify",
  marginBottom: 20
};

const $heading: TextStyle = {
  marginBottom: 10
};

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}