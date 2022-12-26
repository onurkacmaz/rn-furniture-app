const shipmentPrice = 10.24

const getShipmentPrice = (currency = false) => {
  if(currency) {
    return "$" + shipmentPrice
  }
  return shipmentPrice
}

export { getShipmentPrice }