import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'
import basketReducer from '../store/basketReducer'
import { useNavigation } from '@react-navigation/native';

const BasketItem = (props) => {

  const item = props.item
  const navigation = useNavigation()

  const handleOpenItemDetail = (item) => {
    navigation.navigate("ItemDetail", {item: item})
  }

  const handleDecrease = (item) => {
    basketReducer.dispatch({type: 'decrease', item: item})
  }
 
  const handleIncrease = (item) => {
    try {
      basketReducer.dispatch({type: 'increase', item: item})
    }catch(e) {
      Alert.alert(e.message)
    }
  }
  
  return (
    <TouchableOpacity key={item.id} onPress={() => handleOpenItemDetail(item)} style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
      <View style={{flex:0}}>
        <Image source={{uri: item?.images[0]?.value, width:90, height:80}} resizeMode="cover" width="100%" height="100%" />
      </View>
      <View style={{flex:2, marginLeft:20, flexDirection:'column'}}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={{fontWeight:'500', fontSize:17, flex:0.2}}>{item?.name}</Text>
        <Text style={{fontWeight:'700', fontSize:14, flex:1}}>{item?.price}</Text>
        <Text style={{fontWeight:'bold', fontSize:20, flex:0,}}>{item?.additional?.installment.value}</Text>
      </View>
      <View style={{flex:0, alignItems:'flex-end', flexDirection:'row'}}>
          <TouchableOpacity onPress={() => handleDecrease(item)} style={{backgroundColor:'#fff', padding:7, borderRadius:5}}>
            <Icon name="minus" size={10} color="rgb(0,26,77)" />
          </TouchableOpacity>
          <Text style={{paddingHorizontal:10, fontWeight:'bold', fontSize:20}}>{item?.qty}</Text>
          <TouchableOpacity onPress={() => handleIncrease(item)} style={{backgroundColor:'rgb(0,26,77)', padding:7, borderRadius:5}}>
            <Icon style={{flex:0}} name="plus" size={10} color="#fff" />
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default BasketItem