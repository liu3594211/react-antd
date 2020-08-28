import React, { Component } from 'react'
import { connect } from 'react-redux'
import { productClassify } from './../../api/index'
import {
  Steps,
  Divider,
  Tabs,
  Form,
  Input,
  Cascader,
  Upload,
  message,
  Button,
  Checkbox,
} from 'antd'
import Rights from '../rights/rights/Rights'
import { UploadOutlined } from '@ant-design/icons'
const { Step } = Steps
const { TabPane } = Tabs
class AddItem extends Component {
  constructor(props) {
    super(props)
    this.straightforwardProcedure = React.createRef()
    this.state = {
      current: 0,
      num: '1',
      numMo: '1',
      disposeCascade: [],
      credId: '',
      commodityParameters: [],
    }
  }

  componentDidMount() {
    this.cascadeSelector()
  }

  cascadeSelector = async () => {
    const res = await productClassify()
    this.recursionList = (item) => {
      let arr = []
      item.forEach((element) => {
        let newObj = {}
        newObj.value = element.cat_id
        newObj.label = element.cat_name
        if (element.children) {
          newObj.children = this.recursionList(element.children)
        }
        arr.push(newObj)
      })
      return arr
    }
    this.setState({
      disposeCascade: this.recursionList(res.data),
    })
  }

  onChange = (current) => {
    this.setState({ current })
  }
  callback = async (key) => {
    console.log(key)
    // this.setState({ numMo: key })
    this.straightforwardProcedure.current.submit()
    let obj = this.straightforwardProcedure.current.getFieldsValue()
    let abc = Object.values(obj)
    if (abc.includes(undefined)) {
      message.error('请输入基本信息')
    } else {
      this.setState({ numMo: key, current: parseInt(key) - 1 })
      if (key === '2') {
        // 获取动态参数列表
        const { data: res } = await this.$http.get(
          `categories/${this.state.credId}/attributes`,
          {
            params: { sel: 'many' },
          }
        )
        if (res.meta.status === 200) {
          let arr = res.data

          arr.forEach((element) => {
            element.attr_vals = element.attr_vals.split(' ')
          })
          this.setState({
            commodityParameters: arr,
          })
          console.log('arr', arr)
        }
      } else if (key === 3) {
        // 获取静态属性列表
        const { data: res } = await this.$http.get(
          `categories/${this.state.credId}/attributes`,
          {
            params: { sel: 'only' },
          }
        )
      }
    }
  }

  displayRender = (val) => {
    console.log(val)
    if (val.length >= 3) {
      this.setState({
        credId: val.pop(),
      })
    }
  }

  stepsCurrent = (curr) => {
    console.log('curr', curr)
  }

  onChangeParameter(checkedValues) {
    console.log('checked = ', checkedValues)
  }

  render() {
    const { commodityParameters } = this.state
    const props = {
      name: 'file',
      action: 'http://127.0.0.1:8888/api/private/v1/upload',
      headers: {
        authorization: window.sessionStorage.getItem('token'),
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
    }
    const { current } = this.state
    const plainOptions = ['Apple', 'Pear', 'Orange']
    return (
      <div>
        {' '}
        <Steps current={current} onChange={this.stepsCurrent}>
          <Step title="基本信息" />
          <Step title="商品参数" />
          <Step title="商品属性" />
          <Step title="商品图片" />
          <Step title="商品内容" />
          <Step title="完成" />
        </Steps>
        <Divider />
        <Tabs
          defaultActiveKey={this.state.num}
          onChange={this.callback}
          activeKey={this.state.numMo}
          tabPosition="left"
        >
          <TabPane tab="基本信息" key="1">
            <Form
              ref={this.straightforwardProcedure}
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="商品名称"
                name="productName"
                rules={[{ required: true, message: '请输入商品名称!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="商品价格"
                name="price"
                rules={[{ required: true, message: '请输入商品价格!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品重量 "
                name="weight "
                rules={[{ required: true, message: '请输入商品重量!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品数量"
                name="quantity"
                rules={[{ required: true, message: '请输入商品数量!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="商品分类"
                name="classification"
                rules={[{ required: true, message: '请输入商品分类!' }]}
              >
                <Cascader
                  options={this.state.disposeCascade}
                  onChange={this.displayRender}
                  placeholder="请选择商品分类"
                />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="商品参数" key="2">
            {commodityParameters && commodityParameters.length > 0 ? (
              <div>
                {commodityParameters.map((item) => {
                  return (
                    <div key={item.attr_id}>
                      <p style={{ margin: '30px' }}>{item.attr_name}</p>
                      <Checkbox.Group
                        options={item.attr_vals}
                        defaultValue={item.attr_vals}
                        onChange={this.onChangeParameter}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              '暂无'
            )}
          </TabPane>
          <TabPane tab="商品属性" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="商品图片" key="4">
            <Upload {...props}>
              <Button>
                <UploadOutlined /> 请上传图片
              </Button>
            </Upload>
            ,
          </TabPane>
          <TabPane tab="商品内容" key="5">
            Content of Tab Pane 5
          </TabPane>
          <TabPane tab="完成" key="6">
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
