import React, { Component } from 'react'
import { Form, Input } from 'antd'
export default class EditFrom extends Component {
  onFinish = (values) => {
    console.log('Success:', values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const tailLayout = {
      wrapperCol: { offset: 5, span: 19 },
    }

    return (
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="角色名称"
            name="username"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色描述"
            name="Userdescribe"
            rules={[{ required: true, message: '请输入角色描述!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
