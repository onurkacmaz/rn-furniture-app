import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const ItemComponent = (props) => {

  const navigation = useNavigation();

  const [v, setV] = useState(props.item);
  
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleOpenItemDetail = (item) => {
    navigation.navigate("ItemDetail", {item: item})
  }

  useEffect(() => {
    setV(props.item)
    setIsFavorite(v.isFavorite)
  }, [])

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleOpenItemDetail(v)}>
      <View style={{flexDirection:'row', flex:1}}>
        <Text style={{flex:4, fontWeight:'bold', fontSize:20}}>{v.price}</Text>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Icon style={{flex:0}} name={isFavorite ? "heart" : "heart-o"} size={20} color="rgb(0,26,77)" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop:20, alignSelf:'center', flex:1}}>
        <Image source={{uri: v.images[0]?.path, width:90, height:90}} width="100%" height="100%" />
      </View>
      <Text ellipsizeMode='tail' numberOfLines={1} style={{textAlign:'center', marginTop:10, fontSize:20, flex:1}}>{v.name}</Text>
      <View style={{padding:10, backgroundColor:'#fff', borderRadius:10, flex:0, marginTop:10}}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={{textAlign:'center'}}>Rent for {v.additionalItems?.installment?.value}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemComponent

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:15,
    width:180,
    borderRadius:20,
    backgroundColor:'rgb(241,241,241)',
    marginRight:20
  }
})