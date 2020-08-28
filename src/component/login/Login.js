import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import './login.less'
import { logins } from '../../api/index'
import { setLocalStore } from '../../config/global'

export default class Login extends Component {
  render() {
    const layout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 16,
      },
    }
    const tailLayout = {
      wrapperCol: {
        offset: 3,
        span: 16,
      },
    }
    const onFinish = async (values) => {
      console.log('Success:', values)
      if (values.password && values.username) {
        const data = await logins(values)
        console.log('data', data)
        if (data.meta.status === 200) {
          setLocalStore('token', data.data.token)
          this.props.history.push('/')
        }
      }
    }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo)
    }
    const rules = [
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
    const passwords = [
      { required: true, message: '必须输入密码' },
      { min: 4, message: '密码必须大于 4 位' },
      { max: 12, message: '密码必须小于 12 位' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: '密码必须是英文、数组或下划线组成',
      },
    ]
    return (
      <div className="login">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="loginForm"
        >
          <Form.Item label="用户名" name="username" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={passwords}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
