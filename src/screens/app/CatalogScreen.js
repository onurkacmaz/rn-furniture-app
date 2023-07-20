import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, RefreshControl, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemComponent from '../../components/ItemComponent';
import CategoryApi from './../../store/CategoryApi'
import ProductApi from './../../store/ProductApi'

const CatalogScreen = ({route, navigation}) => {

  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id)
    getProducts({categoryId: id})
  }

  const setSearchKeyword = (text) => {
    getProducts({
      categoryId: selectedCategoryId,
      q: text
    })
  }

  useEffect(() => { 
    getCategories({parent:""})
    getProducts()
  }, [])

  const handleOpenPopularProducts = () => {
    navigation.navigate("ViewAllItems", {categoryId: selectedCategoryId})
  }

  const getCategories = (data) => {
    CategoryApi.get(data).then(r => {
      setCategories(r.data.data)
      setSelectedCategoryId(r.data.data[0].id)
    })
  }

  const getProducts = (data = {}) => {
    setRefreshing(true);
    if(!data.categoryId) {
      data.categoryId = selectedCategoryId
    }
    ProductApi.get(data).then(r => {
      setProducts(r.data.data)
    }).finally(() => {
      setRefreshing(false)
    })
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Catalog</Text>
        <View style={{height:70}}>
          <ScrollView contentInset={{right:30}} style={[styles.scrollableCategories]} horizontal showsHorizontalScrollIndicator={false}>
            {
              categories.map((v, i) => {
                return (
                  <TouchableOpacity onPress={() => handleSelectCategory(v.id)} key={v.id} style={[styles.categoryBage, selectedCategoryId == v.id ? styles.categoryBageActive : '']}>
                    <Text style={[styles.categoryBageText, selectedCategoryId == v.id ? styles.categoryBageTextActive : '']}>{v.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={styles.searchContainer}>
          <TextInput onChangeText={(text) => setSearchKeyword(text)} placeholder='Text here...' keyboardType='default' style={styles.searchInput} />
          <TouchableOpacity style={styles.searchFilterButton}>
            <Icon name="align-center" size={20} color="rgb(82,115,149)" />
          </TouchableOpacity>
        </View>
        <ScrollView refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={getProducts}
            />} contentInset={{bottom:50}} style={styles.popularItemsContainer}>
          <View style={[styles.popularItemsHeading]}>
            <Text style={[styles.heading, styles.thin, {flex:4, marginTop:0}]}>New arrival of chairs</Text>
            <TouchableOpacity style={{flex:0, justifyContent:'center', alignSelf:'center'}} onPress={() => handleOpenPopularProducts()}>
              <Text style={[styles.heading, styles.thin, {marginTop:0, fontSize:17, color:'rgb(0,29,79)', fontWeight:'bold', }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentInset={{right:30}} horizontal showsHorizontalScrollIndicator={false} style={styles.popularItems}>
            {
              products.slice(0,5).map((v, i) => {
                return (
                  <ItemComponent key={i} item={v}/>
                )
              })
            }
          </ScrollView>
          <View style={styles.popularItemsHeading}>
            <Text style={[styles.heading, styles.thin, {flex:4}]}>Special offer just for you</Text>
          </View>
          <View style={styles.specialOfferContainer}>
            <Image style={{borderRadius:20}} source={{uri: 'https://static.vecteezy.com/system/resources/previews/005/405/595/original/special-offer-sale-banner-besign-discount-label-and-sticker-for-media-promotion-product-free-vector.jpg', height:170}} resizeMode="cover" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CatalogScreen

const styles = StyleSheet.create({
  specialOfferContainer: {
    marginTop:20,
    paddingHorizontal:20
  },
  thin: {
    fontWeight:'400',
    fontSize:25
  },
  popularItemsContainer: {
    paddingTop:20,
    marginTop:10,
  },
  popularItemsHeading: {
    flexDirection:'row'
  },
  container: {
    flex:1,
    backgroundColor:'#fff'
  },
  heading: {
    marginTop:20, 
    paddingHorizontal:20,
    fontSize:30,
    fontWeight:'600'
  },
  scrollableCategories: {
    height:10,
    paddingHorizontal:20,
    marginTop:20,
  },
  popularItems: {
    marginTop:20,
    paddingHorizontal:20
  },
  categoryBage: {
    fontWeight:'bold',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    width:100,
    marginRight:10,
    borderRadius:100,
    backgroundColor:'rgb(241,241,241)'
  },
  categoryBageText: {
    fontWeight:'bold',
    color:'rgb(0,29,79)'
  },
  categoryBageTextActive: {
    fontWeight:'bold',
    color:'#fff'
  },
  categoryBageActive: {
    backgroundColor:'rgb(0,29,79)'
  },
  searchContainer: {
    flexDirection:'row',
    marginTop:20,
    paddingHorizontal:20,
  },
  searchInput: {
    flex:1,
    padding:15,
    height:50,
    backgroundColor:'#fff',
    borderWidth:1,
    borderRadius:20,
    borderColor:'#ccc'
  },
  searchFilterButton: {
    flex:0,
    padding:15
  }
})