import { Text, StyleSheet, ScrollView, RefreshControl, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BasketItemComponent from '../../components/BasketItemComponent'
import products from '../../store/products'

const BasketScreen = ({route, navigation}) => {
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={"top"} style={{flex:1}}>
        <Text style={styles.heading}>Checkout</Text>
        <ScrollView contentInset={{bottom:20}} refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />} showsVerticalScrollIndicator={true} style={{paddingHorizontal:20, flex:1}}>
          {
            products.map((v) => {
              return (
                <BasketItemComponent key={v.id} item={v}/>
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
            <Text style={[styles.summary.largeHeading, {fontSize:15}]}>$250</Text>
          </View>
          <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[styles.summary.smallHeading]}>Discount price</Text>
            <Text style={[styles.summary.largeHeading, {fontSize:15}]}>$50</Text>
          </View>
          <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[styles.summary.smallHeading]}>Discount price</Text>
            <Text style={[styles.summary.largeHeading, {fontSize:15}]}>$250</Text>
          </View>
          <View style={{flex:3, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[styles.summary.smallHeading, styles.summary.largeHeading]}>Sub Total</Text>
            <Text style={[styles.summary.smallHeading, styles.summary.largeHeading]}>$200</Text>
          </View>
        </View>
        <View style={{paddingHorizontal:30, flex:0.7}}>
          <TouchableOpacity style={{backgroundColor:'rgb(6,15,78)', flex:1, justifyContent:'center', borderRadius:100}} onPress={() => alert("asd")}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:20, textAlign:'center'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop:20,  
    paddingHorizontal:20,
    fontSize:30,
    fontWeight:'600'
  },
})