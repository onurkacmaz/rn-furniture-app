import { View, Text, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';

const CheckoutScreen = ({route, navigation}) => {
  return (
    <Fragment>
      <SafeAreaView edges={"top"}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={{paddingHorizontal:20}} name={"arrow-left"} size={20} color="rgb(82,115,149)" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView edges={"bottom"} style={{flex:1}}>
        <View>
          <Text>asd</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView edges={"bottom"}>
        <Text>asd</Text>
      </SafeAreaView>
    </Fragment>
  )
}

export default CheckoutScreen