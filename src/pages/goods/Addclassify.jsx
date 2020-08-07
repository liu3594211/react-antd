import React, { Component } from 'react'
import { Form, Cascader, Input } from 'antd'
import { connect } from 'react-redux'
class Addclassify extends Component {
  constructor(props) {
    super(props)
    this.operation = React.createRef()
    this.state = {
      commodity: '',
    }
  }
  componentDidMount() {
    const str = this.props.commodity
    this.props.comeHere(this)

    this.recursion = (ele) => {
      let item = []

      ele.map((element) => {
        let empty = {}
        empty.value = element.cat_id
        empty.label = element.cat_name
        if (element.children) {
          empty.children = this.recursion(element.children)
        }
        item.push(empty)
      })
      return item
    }
    this.recursion(str)
    this.setState({
      commodity: this.recursion(str),
    })
    console.log(this.props)
  }
  onChange = (value) => {
    console.log(value)
  }
  onFinish = (value) => {
    this.operation.current.submit()
    const str = this.operation.current.getFieldValue()
    return str
  }
  render() {
    const { commodity } = this.state
    const options = [
      {
        value: 'zhejiang1',
        label: 'Zhejiang2',
        children: [
          {
            value: 'hangzhou3',
            label: 'Hanzhou4',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ]

    return (
      <div>
        <Form
          ref={this.operation}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
        >
          <Form.Item
            label="活动名称"
            name="username"
            rules={[{ required: true, message: '请输入活动分类!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="父级分类"
            name="cascader"
            rules={[{ required: true, message: '请输入父级分类!' }]}
          >
            <Cascader
              options={commodity}
              onChange={this.onChange}
              changeOnSelect
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    commodity: state.addUser.commodityClassification,
  }
}

export default connect(mapStateToProps)(Addclassify)
