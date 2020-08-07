import ajax from './ajax'
import axios from 'axios'
import jsonp from 'jsonp'
import { message } from 'antd'
import React from 'react'
import { getLocalStore } from './../config/global'
import { Redirect } from 'react-router-dom'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'

axios.interceptors.request.use((config) => {
  const token = getLocalStore('token')
  if (token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.authorization = token
  }

  return config
})

axios.interceptors.response.use((res) => {
  if (res.data.meta.status === 400) {
    message.error('token失效,请重新登录')
    window.localStorage.clear()
    return <Redirect to="/login" />
  }
  return res
})

React.Component.prototype.$http = axios

// /* 登陆 */
export const logins = (params) => ajax('/login', params, 'POST')

//左侧动态菜单
export const menuItem = (params) => ajax('/menus', params, 'get')

//管理员列表
export const administratorList = (params) => ajax('/users', params, 'get')

//管理员状态改变
export const commoditySoldutTul = (params) => {
  ajax(`users/state/`, params, 'put')
}

//搜索用户
export const fillForm = (params) => ajax('users', params, 'GET')

//添加用户
export const addUserName = (params) => ajax('users', params, 'POST')

//可选角色
export const optionalRole = (params) => ajax('roles', params, 'GET')

//权限列表
export const jurisdictionList = (params) => ajax('/rights/list', params, 'GET')

//添加角色
export const addRole = (params) => ajax('/roles', params, 'POST')

//树形控件权限
export const treeJurisdiction = (params) => ajax('/rights/tree', params, 'GET')

//商品列表
export const productList = (params) => ajax('/goods', params, 'GET')

//商品分类
export const productClassify = (params) => ajax('/categories', params, 'GET')

//添加商品分类
export const addProductClassify = (params) =>
  ajax('/categories', params, 'POST')

//获取当前城市
export const reqeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (data.status == 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({
          dayPictureUrl,
          weather,
        })
      } else {
        message.error('请求天气失败')
      }
    })
  })
}
