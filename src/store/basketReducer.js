import { createStore } from 'redux'
import { faker } from '@faker-js/faker';

function findById(haystack, value) {
  return haystack.findIndex(object => {
    return object.id === value;
  });
}

function haveStock(totalQty, qty) {
  return qty <= totalQty
}

function basketReducer(state = {items: []}, action) {
  switch (action.type) {
    case 'add':
      var index = findById(state.items, action.item.id)

      if(index != -1) {
        
        if(!haveStock(state.items[index].totalQty, state.items[index].qty + action.qty)) {
          throw Error("You cant add more")
        }

        state.items[index].qty += action.qty
      }else {
        let item = action.item
        item.qty = action.qty
        item.addedDate = Date.now()
        state.items.push(item)
      }
      return {...state, uuid: faker.datatype.uuid()}
    case 'remove':
      var index = findById(state.items, action.item.id)
 
      state.items.splice(index, 1)

      return {...state, uuid: faker.datatype.uuid()}
    case 'increase':
      var index = findById(state.items, action.item.id)

      if(index != -1) {
        if(!haveStock(state.items[index].totalQty, state.items[index].qty + 1)) {
          throw Error("You cant add more")
        }
        state.items[index].qty++
      }
      
      return {...state, uuid: faker.datatype.uuid()}
    case 'decrease':
      var index = findById(state.items, action.item.id)

      var item = state.items[index]

      if(index != -1) {
        if(item.qty - 1 > 0) {
          state.items[index].qty--
        }else {
          state.items.splice(index, 1)
        }
      }

      if(state.items.length <= 0) {
        delete state.discount
      }
      
      return {...state, uuid: faker.datatype.uuid()}
    case 'addDiscount':

      if(state.items.length <= 0) {
        throw Error("You dont have any items in basket!")
      } 

      state.discount = action.discount
      
      return {...state, uuid: faker.datatype.uuid()}
    case 'removeDiscount':
      delete state.discount
      
      return {...state, uuid: faker.datatype.uuid()}
    default:
      return state
  }
}

const basket = createStore(basketReducer)

export default basket