import React, { Component } from 'react'
import { Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { menuItem } from '../../api/index'
import { Link, withRouter } from 'react-router-dom'
import { getLocalStore } from '../../config/global'
import Login from '../../component/login/Login'

import './LeftNav.less'
const { SubMenu } = Menu
class LeftNav extends Component {
  state = {
    resutl: [],
    navBar: '',
    keyPath: ['110', '125'],
  }
  onOpenChange = (key) => {}
  onClick = (a) => {
    this.setState({
      keyPath: a.keyPath,
    })
  }
  //递归渲染菜单列表
  getMenuNodes = (menuList) => {
    return menuList.map((item, index) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.id} icon={<PieChartOutlined />}>
            <Link to={item.path}>
              <span className="span">{item.authName}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.id}
            onOpenChange={this.onOpenChange}
            onClick={this.onClick}
            icon={<UserOutlined />}
            title={
              <span>
                <span>{item.authName}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  async componentWillMount() {
    const data = await menuItem()
    this.setState({
      resutl: data.data,
    })
  }

  render() {
    //左侧菜单
    const dis = this.state.resutl

    // 得到当前请求的路由路径
    let path = this.props
    console.log('999', this.state.keyPath)
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          theme="dark"
          mode="inline"
          onOpenChange={this.onOpenChange}
          defaultOpenKeys={this.state.keyPath}
          selectedKeys={this.state.keyPath}
        >
          {this.getMenuNodes(dis)}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
