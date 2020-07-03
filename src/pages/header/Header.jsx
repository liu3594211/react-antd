import React, { Component } from 'react'
import { Button,message} from 'antd';
import {
  BrowserRouter ,
  Route,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom'
import {removeLocalStore} from './../../config/global'
import {reqeather} from './../../api/index'
import store from './../../sotre/index'

import './header.less'
 class Header extends Component {

     constructor(){
       super()
       this.state={
        dayPictureUrl:'',
        weather:''
      }
     }
        //退出
        dropOut = () =>{        
          removeLocalStore('token')
          message.success('退出成功');       
          setTimeout(()=>{
            this.props.history.push('/login')                  
          },3000)
        }     
      componentDidMount(){    
         store.subscribe(()=>{
          this.setState(store.getState());
          reqeather(this.state.city).then((res)=>{
            const {dayPictureUrl,weather} = res
            
            this.setState({
              dayPictureUrl:dayPictureUrl,
              weather:weather
            })          
          })
        })   
        
       this.practice()

        }

        practice = ()=> {
          // 得到当前请求路径
         const path = this.props.location.pathname;
       
         
      }

  render() {
         // 得到当前请求的路由路径
         let path = this.props.location.pathname;     
     
    const {dayPictureUrl,weather} = this.state   
    return (
      <div className='header'>
        <Button type="primary" onClick={this.dropOut} className='drop-out'>
           退出
        </Button>
    <span className='headerCity'>{weather}</span>
    <span className='headerCity'> <img src={dayPictureUrl} alt=""/>  </span>
      </div>
    )
  }
}

export default withRouter(Header)
