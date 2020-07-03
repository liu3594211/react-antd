import React, { Component } from 'react'
import {getLocalStore} from './../../config/global'
import { Layout, Breadcrumb,Button,message} from 'antd';
  import {
    BrowserRouter ,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import Rights from './../../pages/rights/rights/Rights'
import Roles from './../../pages/rights/roles/Roles'
import Users from './../../pages/users/users/Users'
import Null from './../../pages/null/null'
import LeftNav from './../../pages/LeftNav/LeftNav'
import Params from './../../pages/goods/Params'
import Goods from './../../pages/goods/Goods'
import Categories from './../../pages/goods/Categories'
import Orders from './../../pages/orders/index'
import Reports from './../../pages/reports/index'
import Header from './../../pages/header/Header'
import store from './../../sotre/index'
import {getTodoList} from './../../sotre/actionCreators'
import './admin.less'
  const { Content, Footer, Sider } = Layout;
export default class Admin extends Component {
  constructor(){
      super()
        //先绑定方法
        this.state = {
          collapsed: false,   
          id:''   
        };
      this.state = store.getState()
    this.handleStoreChange = this.handleStoreChange.bind(this);
     //写一个方法，用this.setState更新加载的数据
     store.subscribe(this.handleStoreChange);
     
  }
    handleStoreChange() {
       this.setState(store.getState());
     }

      onCollapse = collapsed => {
        this.setState({ collapsed });
      };

    componentDidMount(){
      const action = getTodoList()
      store.dispatch(action);      
    }


    practice = ()=> {
      // 得到当前请求路径
     let path = this.props.location.pathname.slice(1);       
     let title;
     let connector = {}
     const {menus} = this.state    
     menus.forEach((element,index)=>{ 
      //  if(element.path === path){
      //       console.log('element',element);        
      //  }                    
       if(element.children){       
         //找到子元素第一次出现的位置
       let ctiem = element.children.find((ctiems,index,arr)=>      
       ctiems.path == path     
       )        
          if(ctiem){
            title = ctiem.authName  
            connector = ctiem
            //  this.setState({
            //     id:ctiem
            //  })            
          }                      
       }
     }) 
    return title      
  }

  findIndexArray(data, id, indexArray){
    let arr = Array.from(indexArray)
                for (let i = 0, len = data.length; i < len; i++) {
                    arr.push(data[i].authName)
                    if (data[i].path === id) {
                        return arr
                    }
                    let children = data[i].children                   
                    if (children && children.length) {
                        let result = this.findIndexArray(children, id, arr)
                        if (result) return result
                    }
                    arr.pop()
                }
                return false
}

  

  measurement = ()=>{
        const {
            menus,
            id
        } = this.state
        console.log(this.findIndexArray(menus, id, []))
  }


    render() {
        const token = getLocalStore('token')  
        const {
            menus
        } = this.state   
        if(!token){
             //如果没有id的话就强制到login登录页面
           return <Redirect to="/login" />;
        }     
         // 得到当前请求的路由路径
    //  let path = this.props.location.pathname.slice(1);  
    //    console.log( this.findIndexArray(menus, path, []));
       
        return (
            <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <LeftNav />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
         
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item >首页</Breadcrumb.Item>
              <Breadcrumb.Item> {          this.practice() }  </Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>   
              <Redirect from='/' exact  to="/users" />    
               <Route path='/rights' component={Rights} />
               <Route path='/roles' component={Roles} />
               <Route path='/users'  component={Users} />
               <Route path='/params'  component={Params} />
               <Route path='/goods'  component={Goods} />
               <Route path='/categories'  component={Categories} />
               <Route path='/orders'  component={Orders} />
               <Route path='/reports'  component={Reports} />
               <Route path='/null' component={Null} />  
               <Route  component={Null} />  
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
        )
    }
}
