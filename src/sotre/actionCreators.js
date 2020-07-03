import {MAP_LOCATION,ASYNCHRONUS_DATA} from './actionTypes'
import {menuItem} from './../api/index'
//箭头函数的两种写法，带大括号的不需要return，不带的要
export const mapCity = (value)=>({
  type:MAP_LOCATION,
  value:value
})

export const AsynchronusData = (value) => {
  return {
    type:ASYNCHRONUS_DATA,
    value:value
  }
}


//异步请求，redux-thunk的使用
export const getTodoList = ()=>{
  return async (dispatch)=>{
    const data = await menuItem()
    const action = AsynchronusData(data.data);
    dispatch(action)
  }
}