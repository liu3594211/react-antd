import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';


export default class adduser extends Component {
  




  
     onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
  
    onValuesChange = value=>{
      console.log('onValuesChange',value);
      
    }
    onFinish = values => {
      console.log('Success:', values);
    };
  

  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 5, span: 16 },
    };

    const username = [
      {
        required: true, message: "必须输入用户名"
      },
      { min: 4, message: "用户名必须大于 4 位" },
      { max: 12, message: "用户名必须小于 12 位" },
      {
         pattern: /^[a-zA-Z0-9_]+$/,
         message: "用户名必须是英文、数组或下划线组成"
      }
    ]

    const password = [
      { required: true, message: "必须输入密码" },
      { min: 4, message: "密码必须大于 4 位" },
      { max: 12, message: "密码必须小于 12 位" },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: "密码必须是英文、数组或下划线组成"
      }
    ]
    const email = [   
        { required: true, message: "请输入邮箱地址" },
        {
          pattern: /^\w+@\w+(\.\w+)+$/,
          message: "请输入正确的邮箱"
        }
    ]
    const phone = [   
      { required: true, message: "请输入手机号" },
      {
        pattern: /^1[34578]\d{9}$/,
        message: "请输入正确的手机号"
      }
  ]
    
    return (
      <div>
         <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onValuesChange={this.onValuesChange}
      onFinishFailed={this.onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={password}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={email}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="手机"
        name="phone"
        rules={phone}
      >
        <Input />
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
