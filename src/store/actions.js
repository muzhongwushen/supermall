import {ADD_TO_CART,ADD_COUNTER} from "./mutation-types";

export default {
  addCart(context, payload) {
    // let oldProduct=null;
    // for (let item of state.cartList){
    //   if (item.iid===payload.iid){
    //     oldProduct=item
    //   }
    // }
    // if (oldProduct){
    //   oldProduct.count+=1
    // }else {
    //   payload.count=1
    //   state.cartList.push(payload)
    // }
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      if (oldProduct) {
        //oldProduct.count+=1
        context.commit(ADD_COUNTER, oldProduct)
        resolve("商品数量+1")
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve("加入购物车")
      }
    }))


  }
}
