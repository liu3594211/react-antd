import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import PropTypes from 'prop-types'
class Compile extends Component {
  constructor(props) {
    super(props)
    this.poerRefs = React.createRef()
  }
  state = {
    copyreader: '',
  }
  componentDidMount() {
    this.props.validation(this)
  }

  onFinish = () => {
    this.poerRefs.current.submit()
    const arr = this.poerRefs.current.getFieldsValue()
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
    const copyreader = this.props.copyreader
    console.log(copyreader)

    return (
      <div>
        <Form
          ref={this.poerRefs}
          {...layout}
          name="basic"
          initialValues={{
            ['username']: copyreader.username,
            ['email']: copyreader.email,
            ['mobile']: copyreader.mobile,
          }}
        >
          <Form.Item label="用户名" name="username">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

Compile.propTypes = {
  copyreader: PropTypes.object,
}

export default Compile
