import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IcArrowDown, IcArrowUp, IcBasketWhite, IcFireWhite, IcTriangle } from '../../../assets';
import Collapsible from 'react-native-collapsible';
import { Gap } from '../../atoms';

const DrawerNavigator = ({navigation}) => {
    const [collapseToggle, setCollapseToggle] = useState({
        'products': false,
        'gas': false
    });

    return (
        <DrawerContentScrollView style={styles.container}>
            {/* PRODCTS SECTION */}
            <TouchableOpacity onPress={() => setCollapseToggle({...collapseToggle, products: collapseToggle.products ? false: true})} style={styles.section}>
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
            <Collapsible collapsed={collapseToggle.products} style={styles.collapseContent}>
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
            {/* GAS SECTION */}
            <Gap height={20} />
            <TouchableOpacity onPress={() => setCollapseToggle({...collapseToggle, gas: collapseToggle.gas ? false : true})} style={styles.section}>
                <IcFireWhite />
                <Text style={styles.sectionTitle} >Gas</Text>
                {
                    collapseToggle ? (
                        <IcArrowDown style={styles.sectionArrow} />
                    ) : (
                        <IcArrowUp style={styles.sectionArrow} />
                    )
                }
            </TouchableOpacity>
            <Collapsible collapsed={collapseToggle.gas} style={styles.collapseContent}>
                <TouchableOpacity onPress={() => navigation.navigate('ManageStackGas')} style={styles.collapseItem}>
                    <IcTriangle />
                    <Text style={styles.collapseLabel}>Daftar Gas</Text>
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
        alignItems: 'center',
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