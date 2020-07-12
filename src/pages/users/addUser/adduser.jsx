import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'
const { Option } = Select
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 16,
  },
}
class adduser extends Component {
  formRef = React.createRef()
  onGenderChange = (value) => {
    console.log(value)
  }

  //让父组件可以获取到子组件的所有实例
  componentDidMount() {
    this.props.onRefChild(this)
  }

  onReset = () => {
    this.formRef.current.submit()
    const arr = this.formRef.current.getFieldsValue()
    console.log('this.formRef.current', this.formRef.current)
    return arr
  }

  render() {
    const username = [
      {
        required: true,
        message: '必须输入用户名',
      },
      { min: 4, message: '用户名必须大于 4 位' },
      { max: 12, message: '用户名必须小于 12 位' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: '用户名必须是英文、数组或下划线组成',
      },
    ]

    const password = [
      { required: true, message: '必须输入密码' },
      { min: 4, message: '密码必须大于 4 位' },
      { max: 12, message: '密码必须小于 12 位' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: '密码必须是英文、数组或下划线组成',
      },
    ]
    const email = [
      { required: true, message: '请输入邮箱地址' },
      {
        pattern: /^\w+@\w+(\.\w+)+$/,
        message: '请输入正确的邮箱',
      },
    ]
    const phone = [
      { required: true, message: '请输入手机号' },
      {
        pattern: /^1[34578]\d{9}$/,
        message: '请输入正确的手机号',
      },
    ]

    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={this.onFinish}
      >
        <Form.Item name="username" label="用户名" rules={username}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item name="password" label="密码" rules={password}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item name="email" label="邮箱" rules={email}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item name="phone" label="手机" rules={phone}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Form>
    )
  }
}

export default adduser
