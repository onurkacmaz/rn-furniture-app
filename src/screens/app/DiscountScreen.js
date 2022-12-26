import { View, Text } from 'react-native'
import React from 'react'
import basket from '../../store/basketReducer'

const DiscountScreen = () => {

  const handleApplyDiscountCode = () => {
    basket.dispatch({
      type: 'addDiscount', 
      discount: {
        type: 'percent',
        value: 10,
        plainText: "%10",
        code: "ABC123"
      }
    })
  }

  const handleRemoveDiscount = () => {
    basket.dispatch({
      type: 'removeDiscount'
    })
  }

  return (
    <View>
      <Text>DiscountScreen</Text>
    </View>
  )
}

export default DiscountScreen