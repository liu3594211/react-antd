import React, { Component } from 'react'
import { Form, Input } from 'antd'
export default class EditFrom extends Component {
  constructor(props) {
    super(props)
    this.character = React.createRef()
    console.log(props)
  }
  componentDidMount() {
    this.props.graceful(this)
  }
  onFinish = () => {
    this.character.current.submit()
    const arr = this.character.current.getFieldsValue()
    return arr
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
          ref={this.character}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色描述"
            name="roleDesc"
            rules={[{ required: true, message: '请输入角色描述!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
