import React, { Component } from 'react'
import { Form, Input } from 'antd'
import { connect } from 'react-redux'
class EditFrom extends Component {
  constructor(props) {
    super(props)
    this.character = React.createRef()
    this.state = {
      playback: {},
    }
  }
  componentDidMount() {
    this.props.graceful(this)
  }

  //在还没有render之前执行
  componentWillMount() {
    this.setState({
      playback: this.props.todo.addUser,
    })
  }

  //动态props和state更新的生命周期
  componentWillUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps)
    console.log('nextState', nextState)
    if (nextProps.todo.addUser !== this.props.todo.addUser) {
      // this.setState(
      //   {
      //     playback: nextProps.todo.addUser,
      //   },
      //   () => {}
      // )
      console.log('操作', this.character)
      console.log('操作2', this.character.current)
      //解决initialValues不能动态赋值的问题
      this.character.current.setFieldsValue({
        roleName: nextProps.todo.addUser.roleName,
        roleDesc: nextProps.todo.addUser.roleDesc,
      })
      return true
    }
  }
  onFinish = () => {
    this.character.current.submit()
    const arr = this.character.current.getFieldsValue()

    return arr
  }

  //清除from表单
  resetFields = () => {
    this.character.current.resetFields()
  }
  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const tailLayout = {
      wrapperCol: { offset: 5, span: 19 },
    }
    console.log('render', this.state)

    return (
      <div>
        <Form
          ref={this.character}
          {...layout}
          initialValues={this.state.playback}
          name="basic"
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

const mapStateToProps = (state) => {
  return {
    todo: state.addUser,
  }
}

export default connect(mapStateToProps)(EditFrom)
