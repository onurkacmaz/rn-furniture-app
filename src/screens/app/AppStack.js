import React, { useMemo, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'
import ItemDetailScreen from './ItemDetailScreen'
import CatalogScreen from './CatalogScreen'
import BasketScreen from './BasketScreen'
import CheckoutScreen from './CheckoutScreen'
import PaymentSuccessScreen from './PaymentSuccessScreen'
import AccountScreen from './AccountScreen'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {OverlayContext} from '../../context/overylayContext'
import { Provider, useSelector } from 'react-redux';
import basketReducer from '../../store/basketReducer'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const Tabs = () => {

  const state = useSelector((state) => state)

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
              <View style={{flexDirection:'row', alignItems:'flex-end', padding:15, borderRadius:100, backgroundColor:'rgb(0, 17, 70)'}}>
                <Icon name="shopping-cart" size={20} color="#fff">
                </Icon>
                {state.items.length > 0 ? <Text style={{marginLeft:5, color:'#fff', fontWeight:'bold', fontSize:15}}>{state.items.length}</Text> : null}
              </View>
              :
              <View style={{flexDirection:'row', alignItems:'flex-end', padding:15, borderRadius:100}}>
                <Icon name="shopping-cart" size={20} color="rgb(82,115,149)" />
                {state.items.length > 0 ? <Text style={{marginLeft:5, color:'rgb(82,115,149)', fontWeight:'bold', fontSize:15}}>{state.items.length}</Text> : null}
              </View>
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

  const [overlayActive, setOverlayActive] = useState(false)
  const [contextChilds, setContextChilds] = useState()

  const context = useMemo(() => ({
    showOverlay: () => {
      setOverlayActive(true)
    },
    hideOverlay: () => {
      setOverlayActive(false)
    },
    overlayActive: overlayActive,
    childs: contextChilds,
    setChilds: (a) => {
      return setContextChilds(a)
    }
  }))

  return (
    <Provider store={basketReducer}>
    <OverlayContext.Provider value={context}>
      {context.overlayActive ? <View style={[StyleSheet.absoluteFill, {padding:50, backgroundColor:'rgba(0,0,0,0.8)', zIndex:1001}]} >{context.childs}</View> : null}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Tab" options={{headerShown:false}} component={Tabs} />
        <Stack.Screen name="ItemDetail" options={{headerShown:false}} component={ItemDetailScreen} />
        <Stack.Screen name="Checkout" options={{headerShown:false}} component={CheckoutScreen} />
        <Stack.Screen name="PaymentSuccess" options={{headerShown:false}} component={PaymentSuccessScreen} />
      </Stack.Navigator>
    </OverlayContext.Provider>
    </Provider>
  )
}

export default AppStack