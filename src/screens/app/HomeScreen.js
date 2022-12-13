import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'

const HomeScreen = ({route, navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("ItemDetail")}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  }
})