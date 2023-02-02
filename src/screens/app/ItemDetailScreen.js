import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePreview from '../../components/ImagePreview';
import basketReducer from '../../store/basketReducer';

const ItemDetailScreen = ({route, navigation}) => {

  const { item } = route.params
  const [isFavorite, setIsFavorite] = useState()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setIsFavorite(item?.isFavorite)
  }, [item])

  const renderImages = () => {
    return item?.images?.map((v) => {
      return v.value
    })
  }

  const handleOpenComments = (id) => {
    alert(id)
  }

  const handleIncreaseQty = () => {
    if(qty + 1 <= item.totalQty) {
      setQty(qty + 1)
    }
  }

  const handleDecreaseQty = () => {
    if(qty - 1 >= 1) {
      setQty(qty - 1)
    }
  }

  const handleAddItemToCart = () => {
    try {
      basketReducer.dispatch({type: 'add', item: item, qty: qty})
      Alert.alert("Ürün sepete eklendi.")
    }catch(e) {
      Alert.alert(e.message)
    }
  }
  
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'transparent' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={{paddingHorizontal:20}} name={"arrow-left"} size={20} color="rgb(82,115,149)" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={{flex:4}}>
        <View style={{flex:0.60}}>
        <ImagePreview images={renderImages()} />
        </View>
        <View style={{flex:1, paddingHorizontal:30, paddingTop:30, backgroundColor:'#fff', borderTopLeftRadius:40, borderTopRightRadius:40}}>
          <View style={{flex:0, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{flex:3, fontSize:25, fontWeight:'bold'}}>{item?.name}</Text>
            <TouchableOpacity style={{flex:0}} onPress={() => setIsFavorite(!isFavorite)}>
              <Icon style={{flex:0}} name={isFavorite ? "heart" : "heart-o"} size={20} color="rgb(255,90,98)" />
            </TouchableOpacity>
          </View>
          <View style={{flex:0, paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#ddd', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Icon name={"tag"} size={20} color="rgb(82,115,149)" />
            <Text style={{flex:0.90, fontWeight:'bold', fontSize:15}}>IKEA</Text>
            <TouchableOpacity onPress={() => handleOpenComments(item.id)}>
              <Text style={{fontWeight:'bold', fontSize:15, color:'rgb(82,115,149)'}}>Comments</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', alignContent:'space-between', flex:0, paddingTop:10, justifyContent:'center', alignSelf:'center', alignItems:'center'}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontWeight:'bold', fontSize:25, color:'rgb(255,90,98)'}}>{item?.price?.slice(0, 1)}</Text>
              <Text style={{fontWeight:'bold', fontSize:50, color:'rgb(255,90,98)'}}>{item?.price?.slice(1, item.price.length)}</Text>
            </View>
            <View style={{flex:1, justifyContent:'flex-end', flexDirection:'row'}}>
              <TouchableOpacity onPress={() => handleDecreaseQty()} style={{backgroundColor:'#fff', padding:7, borderRadius:5}}>
                <Icon name="minus" size={10} color="rgb(0,26,77)" />
              </TouchableOpacity>
              <Text style={{paddingHorizontal:10, fontWeight:'bold', fontSize:20}}>{qty}</Text>
              <TouchableOpacity onPress={() => handleIncreaseQty()} style={{backgroundColor:'rgb(0,26,77)', padding:7, borderRadius:5}}>
                <Icon style={{flex:0}} name="plus" size={10} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
            <Text>{item?.additional?.description}</Text>
          </ScrollView>
        </View>
        <View style={{padding:10, backgroundColor:'#fff', flex:0}}>
          <TouchableOpacity onPress={() => handleAddItemToCart()} style={{padding:15, borderRadius:20, borderWidth:0, alignItems:'center', backgroundColor:'rgb(32,32,32)'}}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#fff', padding:10}} />
    </Fragment>
  )
}

export default ItemDetailScreen