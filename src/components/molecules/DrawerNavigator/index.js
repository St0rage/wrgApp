import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IcArrowDown, IcArrowUp, IcBasketWhite, IcTriangle } from '../../../assets';
import Collapsible from 'react-native-collapsible';

const DrawerNavigator = ({navigation}) => {
    const [collapseToggle, setCollapseToggle] = useState(false);

    return (
        <DrawerContentScrollView style={styles.container}>
            <TouchableOpacity onPress={() => setCollapseToggle(collapseToggle ? false : true)} style={styles.section}>
                <IcBasketWhite />
                <Text style={styles.sectionTitle} >Produk</Text>
                {
                    collapseToggle ? (
                        <IcArrowDown style={styles.sectionArrow} />
                    ) : (
                        <IcArrowUp style={styles.sectionArrow} />
                    )
                }
            </TouchableOpacity>
            <Collapsible collapsed={collapseToggle} style={styles.collapseContent}>
                <TouchableOpacity onPress={() => navigation.navigate('AddProduct')} style={styles.collapseItem}>
                    <IcTriangle />
                    <Text style={styles.collapseLabel}>Tambah Produk</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ManageStack')} style={styles.collapseItem}>
                    <IcTriangle />
                    <Text style={styles.collapseLabel}>Kelola Produk</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddCategory')} style={styles.collapseItem}>
                    <IcTriangle />
                    <Text style={styles.collapseLabel}>Tambah Kategori</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DeleteCategory')} style={styles.collapseItem}>
                    <IcTriangle />
                    <Text style={styles.collapseLabel}>Hapus Kategori</Text>
                </TouchableOpacity>
            </Collapsible>
        </DrawerContentScrollView>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2D52E8',
        paddingHorizontal: 15,
        paddingVertical: 70
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        marginLeft: 10,
        flex: 1
    },
    sectionArrow: {
        marginRight: 15
    },
    collapseContent: {
        // backgroundColor: 'black',
        paddingTop: 18,
        paddingLeft: 10
    },
    collapseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    collapseLabel: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '400'
    }
})