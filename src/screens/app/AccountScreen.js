import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AccountScreen</Text>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  }
})