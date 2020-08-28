import React, { Component } from 'react'
import { Button, Table, Tag, Space, message, Modal, Form, Input } from 'antd'

import { removeLocalStore } from './../../config/global'
export default class Params extends Component {
  onClicks = () => {
    removeLocalStore('token')
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <Button onClick={this.onClicks}>跳转</Button>
      </div>
    )
  }
}
