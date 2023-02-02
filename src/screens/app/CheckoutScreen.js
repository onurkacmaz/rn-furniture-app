import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm from 'react-native-simple-radio-button';
import Cart from '../../utils/cart';

const CheckoutScreen = ({route, navigation}) => {

  const cart = new Cart()

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedInstallment, setSelectedInstallment] = useState(null)

  const [paymentIsProcessing, setPaymentIsProcessing] = useState(false)
  
  const addresses = [
    {
      label: 'Ev Adresim',
      value: 0
    },
    {
      label: 'İş Adresim',
      value: 1
    }
  ];

  const installments = [
    {
      label: '1 Installment',
      value: 1
    },
    {
      label: '2 Installment',
      value: 2
    },
    {
      label: '3 Installment',
      value: 3
    },
  ]

  const cards = [
    {
      label: 'My Card',
      value: 1,
    },
    {
      label: 'Bussines Card',
      value: 2
    }
  ]

  const handlePayment = () => {
    const payment = {}
    setPaymentIsProcessing(true)
    setTimeout(() => {
      navigation.navigate('PaymentSuccess', {payment: payment})
      setPaymentIsProcessing(false)
      cart.reset()
    }, 2000)
  }

  return (
    <SafeAreaView style={{flex:1, paddingHorizontal:20}}>
      <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.goBack()}>
        <Icon name={"arrow-left"} size={20} color="rgb(82,115,149)" />
      </TouchableOpacity>
      <View style={{flex:1, marginTop:20}}>
        <ScrollView nestedScrollEnabled style={{flex:1}} showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor:'rgb(6,15,78)', marginBottom:20}}>
            <View style={{padding:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{fontWeight:'600', color:'#fff', fontSize:16}}>Address</Text>
              <TouchableOpacity onPress={() => alert("asd")}>
                <Text style={{fontWeight:'600', color:'#fff', fontSize:14}}>Add/Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#ddd', padding:15}}>
              <RadioForm
                radio_props={addresses}
                initial={0}
                onPress={(value) => setSelectedAddress(value)}
                buttonColor={'rgb(6,15,78)'}
                selectedButtonColor={'rgb(6,15,78)'}
                buttonSize={20}
                buttonOuterSize={20}
                labelStyle={{fontSize: 15, fontWeight:'500', color:'#333'}}
                buttonWrapStyle={{marginTop: 20}}
              />
            </View>
          </View>
          <View style={{backgroundColor:'rgb(6,15,78)', marginBottom:20}}>
            <View style={{padding:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{fontWeight:'600', color:'#fff', fontSize:16}}>Cards</Text>
              <TouchableOpacity onPress={() => alert("asd")}>
                <Text style={{fontWeight:'600', color:'#fff', fontSize:14}}>Add/Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#ddd', padding:15}}>
              <RadioForm
                radio_props={cards}
                initial={0}
                onPress={(value) => setSelectedCard(value)}
                buttonColor={'rgb(6,15,78)'}
                selectedButtonColor={'rgb(6,15,78)'}
                buttonSize={20}
                buttonOuterSize={20}
                labelStyle={{fontSize: 15, fontWeight:'500', color:'#333'}}
                buttonWrapStyle={{marginTop: 20}}
              />
            </View>
          </View>
          <View style={{backgroundColor:'rgb(6,15,78)', marginBottom:20}}>
            <View style={{padding:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{fontWeight:'600', color:'#fff', fontSize:16}}>Installments</Text>
            </View>
            <View style={{backgroundColor:'#ddd', padding:15}}>
              <RadioForm
                radio_props={installments}
                initial={0}
                onPress={(value) => setSelectedInstallment(value)}
                buttonColor={'rgb(6,15,78)'}
                selectedButtonColor={'rgb(6,15,78)'}
                buttonSize={20}
                buttonOuterSize={20}
                labelStyle={{fontSize: 15, fontWeight:'500', color:'#333'}}
                buttonWrapStyle={{marginTop: 20}}
              />
            </View>
          </View>
          <View style={{backgroundColor:'rgb(6,15,78)', marginBottom:20}}>
            <View style={{padding:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{fontWeight:'600', color:'#fff', fontSize:16}}>Contracts</Text>
            </View>
            <ScrollView nestedScrollEnabled style={{backgroundColor:'#ddd', height:200, padding:15}}>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity disabled={paymentIsProcessing} style={[styles.section, paymentIsProcessing ? {backgroundColor:'#ccc'} : null]} onPress={() => handlePayment()}>
        <Text style={{color:'#fff', fontWeight:'bold', fontSize:20, textAlign:'center'}}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  section: {
    marginVertical:5,
    borderRadius:20,
    justifyContent:'center',
    backgroundColor:'rgb(6,15,78)',
    height:60
  }
})