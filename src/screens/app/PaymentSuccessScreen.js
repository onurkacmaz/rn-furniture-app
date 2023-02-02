import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentSuccessScreen = ({route, navigation}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <Icon name={"check-circle"} size={100} color="green" />
      <Text style={{fontWeight:'bold', fontSize:30, color:'#333', marginTop:20}}>Success</Text>
      <View style={{paddingHorizontal:20}}>
        <Text style={{fontWeight:'bold', textAlign:'center', fontSize:15, color:'#333', marginTop:20}}>Your order created successfully. You can track your orders on the "My Orders" screen.</Text>
        <TouchableOpacity style={[styles.section]} onPress={() => navigation.navigate("Home")}>
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:20, textAlign:'center'}}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PaymentSuccessScreen

const styles = StyleSheet.create({
  section: {
    padding:20,
    marginTop:20,
    marginVertical:5,
    borderRadius:20,
    backgroundColor:'rgb(6,15,78)'
  }
})