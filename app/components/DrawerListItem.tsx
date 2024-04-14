import React from 'react'
import { View, ViewStyle } from 'react-native'

import { spacing } from 'app/theme';

import { Text } from './Text';
import { ListItem } from './ListItem';

export interface IDrawerListItemProps {
    onPress?: (screenName: string) => void;
    item: { name: string; cases: { label: string, name: string }[] }
}

export const DrawerListItem: React.FC<IDrawerListItemProps> = ({ item, onPress }) => (
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

const $menuContainer: ViewStyle = {
    paddingBottom: spacing.xs,
    paddingTop: spacing.lg,
}
