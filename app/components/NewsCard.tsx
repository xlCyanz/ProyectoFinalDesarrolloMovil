import React from 'react'
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native'

import { colors, spacing } from '../theme'

import { Card } from './Card'
import { Text } from './Text'

export interface ICardImageProps {
    title: string;
    photo: string;
    source?: any;
    subtitle: string;
    onPress?: () => void
}


export const CardImage = ({ photo, source, subtitle, title, onPress }: ICardImageProps) => {
    return (
        <Card
            style={$item}
            verticalAlignment="force-footer-bottom"
            onPress={onPress}
            HeadingComponent={
                <View style={$metadata}>
                    <Text style={$metadataText} size="xxs">
                        {subtitle}
                    </Text>
                </View>
            }
            content={title}
            RightComponent={<Image source={photo ? { uri: photo } : source} style={$itemThumbnail} />}
        />
    )
}

const $item: ViewStyle = {
    padding: spacing.md,
    marginTop: spacing.md,
    minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
    width: 70,
    marginTop: spacing.sm,
    height: 70,
    borderRadius: 10,
    alignSelf: "flex-start",
}

const $metadata: TextStyle = {
    color: colors.textDim,
    marginTop: spacing.xs,
    flexDirection: "row",
}

const $metadataText: TextStyle = {
    color: colors.textDim,
    marginEnd: spacing.md,
    marginBottom: spacing.xs,
}