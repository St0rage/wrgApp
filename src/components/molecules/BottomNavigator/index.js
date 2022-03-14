import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { IcBasket, IcBasketWhite, IcFire, IcFireWhite, IcNote, IcNoteWhite } from '../../../assets';
import { useSelector } from 'react-redux';

const Icon = ({label, focus}) => {
    switch(label) {
        case 'Produk' : 
            return focus ? <IcBasketWhite /> : <IcBasket />
        case 'Gas' : 
            return focus ? <IcFireWhite /> : <IcFire />
        case 'Nota' :
            return focus ? <IcNoteWhite /> : <IcNote />
        default : 
            return focus ? <IcBasketWhite /> : <IcBasket />
    }
}

const BottomNavigator = ({state, descriptors, navigation}) => {
    const { keyboard } = useSelector((state) => state.globalReducer)
    return (
        <View style={styles.container(keyboard)}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View style={styles.content}>    
                    <Icon label={label} focus={isFocused} />
                    <Text style={styles.label(isFocused)}>
                    {label}
                    </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
    );
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: (keyboard) => ({
        flexDirection: 'row',
        backgroundColor: '#0E3BEF',
        justifyContent: 'space-around',
        height: 60,
        alignItems: 'center',
        display: keyboard ? 'none' : 'flex'
    }),
    content: {
        alignItems: 'center',
    },
    label: (isFocused) => ({
        color: isFocused ? 'white' : '#0A0A0A',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5
    })
})