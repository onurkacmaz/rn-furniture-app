import { View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const BasketItemComponent = (props) => {
  const item = props.item
  const navigation = useNavigation();

  const handleOpenItemDetail = (id) => {
    navigation.navigate("ItemDetail", {id: id})
  }

  return (
    <TouchableOpacity onPress={() => handleOpenItemDetail(item.id)} style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
      <View style={{flex:0}}>
        <Image source={{uri: item.image, width:90, height:80}} resizeMode="cover" width="100%" height="100%" />
      </View>
      <View style={{flex:2, marginLeft:20, flexDirection:'column'}}>
        <Text style={{fontWeight:'500', fontSize:17, flex:0.2}}>{item.name}</Text>
        <Text style={{fontWeight:'700', fontSize:14, flex:1}}>{item.price}</Text>
        <Text style={{fontWeight:'bold', fontSize:20, flex:0,}}>{item.additional.installment.value}</Text>
      </View>
      <View style={{flex:0, alignItems:'flex-end', flexDirection:'row'}}>
          <TouchableOpacity style={{backgroundColor:'#fff', padding:7, borderRadius:5}}>
            <Icon name="minus" size={10} color="rgb(0,26,77)" />
          </TouchableOpacity>
          <Text style={{paddingHorizontal:10, fontWeight:'bold', fontSize:20}}>1</Text>
          <TouchableOpacity style={{backgroundColor:'rgb(0,26,77)', padding:7, borderRadius:5}}>
            <Icon style={{flex:0}} name="plus" size={10} color="#fff" />
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default BasketItemComponent