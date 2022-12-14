import { Text, Modal, StyleSheet, ScrollView, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cart from '../../utils/cart'
import { useSelector } from 'react-redux';
import BasketItem from '../../components/BasketItem';
import { getShipmentPrice } from '../../store/static'
import Icon from 'react-native-vector-icons/FontAwesome';
import basket from '../../store/basketReducer';
import { useState } from 'react';
import discountCodes from '../../store/discountCodes'

const BasketScreen = ({route, navigation}) => {
  const state = useSelector((state) => state) 
  const [modalVisible, setModalVisible] = useState(false)
  const [discountCode, setDiscountCode] = useState(null)

  const handleOpenDiscountModal = () => {
    setModalVisible(true)
  }
  
  const handleCloseDiscountModal = () => {
    setModalVisible(false)
  }

  const handleApplyDiscountCode = () => {

    const discounts = discountCodes.filter((v) => v.code === discountCode)

    if(discounts.length <= 0) {
      alert("Discount not found!")

      return 
    }

    try{
      basket.dispatch({
        type: 'addDiscount', 
        discount: discounts[0]
      })
    }catch(e) {
      alert(e.message)
      return
    }

    setModalVisible(false)
    setDiscountCode(null)

    return
  }

  const handleOpenCheckoutScreen = () => {
    navigation.navigate('Checkout')
  }

  const handleRemoveDiscount = () => {
    basket.dispatch({
      type: 'removeDiscount'
    })
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={"top"} style={{flex:1}}>
        <Text style={styles.heading}>Checkout</Text>
        <ScrollView contentInset={{bottom:20}} showsVerticalScrollIndicator={true} style={{paddingHorizontal:20, flex:1}}>
          {
            state.items.sort((a,b) => a.addedDate < b.addedDate).map((item, i) => {
              return (
                <BasketItem item={item} />
              )
            })
          }
        </ScrollView>
      </SafeAreaView>
      <View style={{backgroundColor:'#fff', flex:0.5, borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <View style={{paddingHorizontal:30, paddingVertical:20, flex:2, flexDirection:'column'}}>
          <View style={{flex:4}}>
            <Text style={[styles.summary.smallHeading, styles.summary.largeHeading]}>Order Summary</Text>
          </View>
          <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[styles.summary.smallHeading]}>Shipment Price</Text>
            <Text style={[styles.summary.largeHeading, {fontSize:15}]}>{getShipmentPrice(true)}</Text>
          </View>
          {
            state.discount ?
            <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={[styles.summary.smallHeading]}>Discount price</Text>
              <Text style={[styles.summary.largeHeading, {fontSize:15}]}>{state.discount.plainText}</Text>
            </View>
            : null
          }
          <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[styles.summary.smallHeading, styles.summary.largeHeading]}>Sub Total</Text>
            <Text style={[styles.summary.smallHeading, styles.summary.largeHeading]}>{new Cart(state).getTotal()}</Text>
          </View>
        </View>
        <View style={{flex:0.7, flexDirection:'row', paddingHorizontal:20}}>
          <View style={{flex:1}}>
            {
              state.discount ?
              <TouchableOpacity style={[{backgroundColor:'#f00', flex:1, justifyContent:'center', alignItems:'center', borderRadius:100}]} onPress={() => handleRemoveDiscount()}>
                <Icon name="gift" size={20} color="#fff" />
              </TouchableOpacity>
              : 
              <TouchableOpacity style={[{backgroundColor:'rgb(6,15,78)', flex:1, justifyContent:'center', alignItems:'center', borderRadius:100}]} onPress={() => handleOpenDiscountModal()}>
                <Icon name="gift" size={20} color="#fff" />
              </TouchableOpacity>
            }
          </View>
          <TouchableOpacity disabled={state.items.length <= 0} style={[state.items.length <= 0 ? {backgroundColor:'#ccc'} : {backgroundColor:'rgb(6,15,78)'}, {marginLeft:20, flex:2, justifyContent:'center', borderRadius:100}]} onPress={() => handleOpenCheckoutScreen()}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:20, textAlign:'center'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{paddingVertical:30, paddingHorizontal:40, borderRadius:30, flex:1, justifyContent:'center', backgroundColor:'#fff'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Discount</Text>
            <TouchableOpacity onPress={() => handleCloseDiscountModal()}>
              <Icon name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop:20}}>
            <TextInput onChangeText={(text) => setDiscountCode(text)} placeholder='Discount Code' keyboardType='default' style={{padding:15, borderWidth:1, borderColor:'#ccc', borderRadius:10}} />
          </View>
          <View style={{marginTop:20}}>
            <TouchableOpacity onPress={() => handleApplyDiscountCode()} style={{padding:15, backgroundColor:'rgb(6,15,78)', borderRadius:10}}>
              <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold', color:'#fff'}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default BasketScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'rgb(241,241,241)'
  },
  summary: {
    largeHeading: {
      fontSize:22,
      color:'rgb(6,15,78)',
      fontWeight:'600'
    },
    smallHeading: {
      fontSize:15,
      color:'#aaa', 
      fontWeight:'500' 
    }
  },
  heading: {
    textAlign:'center',
    marginTop:10,  
    paddingHorizontal:20,
    fontSize:30,
    fontWeight:'600'
  },
})