import { getShipmentPrice } from "../store/static"

class Cart {
  constructor(cart = []) {
    this.cart = cart
    this.total = 0
    this.prepareTotal()
  }

  prepareTotal() {
    this.total = this.cart.items.reduce((a, b) => {
      return parseFloat(a) + (parseFloat(b.priceWithoutCurrency) * b.qty)
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

  getTotal () {
    return '$' + this.total.toFixed(2)
  }
}

export default Cart