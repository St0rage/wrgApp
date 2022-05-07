import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { currencyFormat } from '../../../utils';

const List = ({name, price = false, id}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{name}</Text>
                {
                    price ? (
                        <Text style={styles.desc}>{currencyFormat(price)}</Text>
                    ) : (
                        <></>
                    )
                }
            </View>
            {
                price ? (
                    <TouchableOpacity activeOpacity={0.7} style={styles.button(price)} onPress={() => navigation.navigate('UpdateGasPrice', {id})} >
                        <Text style={styles.label(price)}>Ubah Harga</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity activeOpacity={0.7} style={styles.button(price)} onPress={() => {}} >
                        <Text style={styles.label(price)}>Hapus</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3B3B3',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    desc: {
        fontSize: 13,
        fontWeight: '500',
        color: '#797979'
    },
    button: (price) => ({
        padding: 8,
        borderRadius: 4,
        backgroundColor: price ? '#2DE834' : '#E82D2D'
    }),
    label: (price) => ({
        fontSize: 13, 
        fontWeight: '400',
        color:  price ? 'black' : 'white'
    })
})