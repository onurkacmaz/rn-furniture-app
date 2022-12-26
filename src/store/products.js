import { faker } from '@faker-js/faker';

let products = [];

for(let i = 0; i < 10; i++) {
  var price = faker.commerce.price(0, 1000, 2)
  let product = {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    categoryId: faker.datatype.uuid(),
    isFavorite: faker.datatype.boolean(),
    price: "$" + price,
    priceWithoutCurrency: price,
    totalQty: faker.datatype.number({min:0, max:10}),
    additional: {
      installment: {
        value: faker.commerce.price(0, 1000, 2, '$') + '/mo'
      },
      description: faker.commerce.productDescription()
    },
    images: []
  }

  for(let k = 0; k < 5; k++) {
    product.images.push({
      id: faker.datatype.uuid(),
      value: faker.image.city(null, null, true)
    })
  }

  products.push(product)
}

export default products