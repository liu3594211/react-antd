import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Divider, Tabs, Form, Input, Cascader } from 'antd'
const { Step } = Steps
const { TabPane } = Tabs
class AddItem extends Component {
  constructor(props) {
    super(props)
    this.straightforwardProcedure = React.createRef()
    this.state = {
      current: 0,
    }
  }
  onChange = (current) => {
    console.log('onChange:', current)
    this.setState({ current })
  }
  callback = (key) => {
    return false
    console.log(key)
    console.log(this.straightforwardProcedure.current.submit())
  }
  render() {
    const { current } = this.state

    const residences = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
    ]

    return (
      <div>
        {' '}
        <Steps current={current}>
          <Step title="基本信息" />
          <Step title="商品参数" />
          <Step title="商品属性" />
          <Step title="商品图片" />
          <Step title="商品内容" />
          <Step title="完成" />
        </Steps>
        <Divider />
        <Tabs defaultActiveKey="1" onChange={this.callback} tabPosition="left">
          <TabPane tab="Tab 1" key="1">
            <Form
              ref={this.straightforwardProcedure}
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="商品名称"
                name="productName"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="商品价格"
                name="price"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品重量 "
                name="weight "
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品数量"
                name="quantity"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="商品分类"
                name="classification"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Cascader options={residences} />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Tab 4" key="4">
            Content of Tab Pane 4
          </TabPane>
          <TabPane tab="Tab 5" key="5">
            Content of Tab Pane 5
          </TabPane>
          <TabPane tab="Tab 6" key="6">
            Content of Tab Pane 6
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(AddItem)
