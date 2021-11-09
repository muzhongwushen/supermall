import {ADD_COUNTER,ADD_TO_CART,CHECK_BTN_CLICK} from "./mutation-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked=true
    payload.count=1
    state.cartList.push(payload)
  },
  [CHECK_BTN_CLICK](state,payload){
    payload.checked = !payload.checked;
  }
}
