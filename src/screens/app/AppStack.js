import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'
import ItemDetailScreen from './ItemDetailScreen'
import CatalogScreen from './CatalogScreen'
import BasketScreen from './BasketScreen'
import AccountScreen from './AccountScreen'
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarStyle: {borderTopWidth:0, paddingBottom:0, height:80}
    }}>
      <Tab.Screen options={{
        tabBarIcon: ({focused}) => {
          return (
            focused ? 
            <View style={{padding:15, borderRadius:50, backgroundColor:'rgb(0, 17, 70)'}}>
              <Icon name="home" size={20} color="#fff" />
            </View>
            :
            <Icon name="home" size={20} color="rgb(82,115,149)" />
          )
        }}} name="Home" component={HomeScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({focused}) => {
          return (
            focused ? 
            <View style={{padding:15, borderRadius:100, backgroundColor:'rgb(0, 17, 70)'}}>
              <Icon name="book" size={20} color="#fff" />
            </View>
            :
            <Icon name="book" size={20} color="rgb(82,115,149)" />
          )
        }}} name="Catalog" component={CatalogScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({focused}) => {
          return (
            focused ? 
            <View style={{padding:15, borderRadius:100, backgroundColor:'rgb(0, 17, 70)'}}>
              <Icon name="shopping-cart" size={20} color="#fff" />
            </View>
            :
            <Icon name="shopping-cart" size={20} color="rgb(82,115,149)" />
          )
        }}} name="Basket" component={BasketScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({focused}) => {
          return (
            focused ? 
            <View style={{padding:15, width:50, justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'rgb(0, 17, 70)'}}>
              <Icon name="user" size={20} color="#fff" />
            </View>
            :
            <Icon name="user" size={20} color="rgb(82,115,149)" />
          )
        }}} name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Tab" options={{headerShown:false}} component={Tabs} />
      <Stack.Screen name="ItemDetail" options={{headerShown:true}} component={ItemDetailScreen} />
    </Stack.Navigator>
  )
}

export default AppStack