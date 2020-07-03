import ajax from "./ajax";
import axios from 'axios';
import jsonp from "jsonp";
import { message } from 'antd';
import React from 'react'
import {getLocalStore} from './../config/global'
axios.defaults.baseURL  = "http://127.0.0.1:8888/api/private/v1"; 

axios.interceptors.request.use(
  config =>{
    const token = getLocalStore('token')
    if(token){  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token
    }
 
   return config;
  }
)


React.Component.prototype.$http = axios


axios.interceptors.response.use((res)=>{ 
  if(res.data.meta.status === 400){
    message.error('token失效,请重新登录');
    setTimeout(()=>{
      
      this.props.history.push("/login");
    })
  }
  return res
})

// /* 登陆 */
export const logins = params => ajax("/login", params, "POST");

//左侧动态菜单
export const menuItem = params => ajax("/menus", params, "get");

//管理员列表
export const administratorList = params => ajax('/users',params, "get")

//管理员状态改变
export const commoditySoldutTul = params => {ajax(`users/state/`,params,'put')}

//搜索用户
export const fillForm = params => ajax('users',params,'GET')

//获取当前城市
export const reqeather = (city)=>{
  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
        if (data.status == 'success') {
            const {
                dayPictureUrl,
                weather
            } = data.results[0].weather_data[0];
            resolve({
                dayPictureUrl,
                weather
            })
         
        } else {
            message.error("请求天气失败");
        }
    });
  })
}