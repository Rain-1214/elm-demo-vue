import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id,
      quantity:product.quantity
    })
  }
}

export const deleProduct = ({state,commit},product) =>{
	commit(types.DELE_PRODUCT,{
		id: product.id,
		quantity: product.quantity
	})
}