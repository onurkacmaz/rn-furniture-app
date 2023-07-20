import { getShipmentPrice } from "../store/static"
import basket from '../store/basketReducer'
import { useSelector } from "react-redux"

class Cart {
  constructor() {
    this.cart = useSelector((state) => state)
    this.total = 0
    this.prepareTotal()
  }

  getItems() {
    return this.cart.items
  }

  getDiscount() {
    return this.cart.discount
  }

  prepareTotal() {
    this.total = this.cart.items.reduce((a, b) => {
      return parseFloat(a) + (parseFloat(b.price) * b.qty)
    }, 0)

    if(this.cart.discount) {

      let discountPrice = this.cart.discount.value

      if(this.cart.discount.type == "percent") {
        discountPrice = (this.total * this.cart.discount.value) / 100
      }
 
      this.total -= discountPrice
    }

    this.total += getShipmentPrice()
  }

  reset() {
    basket.dispatch({type: 'destroy'})
  }

  getTotal () {
    return '$' + this.total.toFixed(2)
  }
}

export default Cart