import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigator, DrawerNavigator } from '../components';
import { AddCategory, AddProduct, DeleteCategory, HomeGas, HomeNota, HomeProduct, ManageProduct, UpdateProduct } from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Router = () => {
    return (
        <Drawer.Navigator useLegacyImplementation={false} drawerContent={(props) => <DrawerNavigator {...props} />}>
            <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Drawer.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
            <Drawer.Screen name="ManageStack" component={ManageStack} options={{ headerShown: false }} />
            <Drawer.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
            <Drawer.Screen name="DeleteCategory" component={DeleteCategory} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

const MainApp = () => {
    return (
        <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}} tabBar={props => <BottomNavigator {...props} /> } >
            <Tab.Screen 
                name="Produk" 
                component={HomeProduct} 
                options={{ headerShown: false }}  
            />
            <Tab.Screen 
                name="Gas" 
                component={HomeGas} 
                options={{ headerShown: false }}  
            />
            <Tab.Screen 
                name="Nota" 
                component={HomeNota} 
                options={{ headerShown: false}}  
            />
        </Tab.Navigator>
    )
}

const ManageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ManageProduct'
                component={ManageProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name='UpdateProduct'
                component={UpdateProduct}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const Home = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
  )
}

export default Router

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#0E3BEF',
        justifyContent: 'space-around',
        height: 60
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5
    }
})
