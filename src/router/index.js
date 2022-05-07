import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { BottomNavigator, DrawerNavigator } from '../components';
import { AddCategory, AddCostumers, AddGasNote, AddProduct, Costumers, DeleteCategory, GasList, HomeGas, HomeNota, HomeProduct, ManageProduct, UpdateGasNote, UpdateGasPrice, UpdateProduct } from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Router = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
            dispatch({type: 'SET_KEYBOARD', value: true})
        });
        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
            dispatch({type: 'SET_KEYBOARD', value: false})
        })
      
        return () => {
            keyboardDidShow.remove();
            keyboardDidHide.remove();
        }
    }, [])

    return (
        <Drawer.Navigator useLegacyImplementation={false} drawerContent={(props) => <DrawerNavigator {...props} />}>
            <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Drawer.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
            <Drawer.Screen name="ManageStack" component={ManageStack} options={{ headerShown: false }} />
            <Drawer.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
            <Drawer.Screen name="DeleteCategory" component={DeleteCategory} options={{ headerShown: false }} />
            <Drawer.Screen name="ManageStackGas" component={ManageStackGas} options={{ headerShown: false }} />
            <Drawer.Screen name="ManageCostumers" component={ManageCostumers} options={{ headerShown: false }} />
            <Drawer.Screen name="AddGasNote" component={AddGasNote} options={{ headerShown: false }} />
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

const ManageStackGas = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='GasList'
                component={GasList}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name='UpdateGasPrice'
                component={UpdateGasPrice}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const ManageCostumers = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Costumers'
                component={Costumers}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name='AddCostumers'
                component={AddCostumers}
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
        <Stack.Screen 
            name="UpdateGasNote"
            component={UpdateGasNote}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
  )
}

export default Router
