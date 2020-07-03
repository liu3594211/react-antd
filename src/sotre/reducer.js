import {MAP_LOCATION,ASYNCHRONUS_DATA} from './actionTypes'


const defaultState = {
  city:'岳阳',
  menus:[]
}

export default (state = defaultState,action)=>{
  if(action.type=== MAP_LOCATION){
      //声明局部变量实现深拷贝，吧state拷贝过来,就相当于有了一个对象
      let newState = JSON.parse(JSON.stringify(state));
        //通过action传递过来的值去改变
      newState.city = action.value
      return newState;    
  }

  if(action.type=== ASYNCHRONUS_DATA){
     //声明局部变量实现深拷贝，吧state拷贝过来,就相当于有了一个对象
     let newState = JSON.parse(JSON.stringify(state));
     //通过action传递过来的值去改变

   
     action.value.forEach(element=>{
      newState.menus.push(element)
     })
     return newState;  
  }

  return state
}