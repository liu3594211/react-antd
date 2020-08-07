import React, { Component } from 'react'
import { Button, Table, Tag, Space, message, Modal, Form, Input } from 'antd'
import { productClassify, addProductClassify } from './../../api/index'
import { connect } from 'react-redux'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import Addclassify from './Addclassify'
const { confirm } = Modal
class Categories extends Component {
  constructor(props) {
    super(props)
    this.classification = React.createRef()
    this.valuescer = React.createRef()
    this.state = {
      classifyList: [],
      total: '',
      visible: 0,
      classifyName: {},
    }
  }
  componentDidMount() {
    this.productClassifyList('1')
  }

  productClassifyList = async (nub) => {
    const res = await productClassify({
      type: 3,
      pagenum: nub,
      pagesize: 5,
    })
    if (res.meta.status === 200) {
      message.success('获取商品分类成功!')
      this.setState({
        classifyList: res.data.result,
        total: res.data.total,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.classifyName != this.state.classifyName) {
      if (this.classification.current != null) {
        this.classification.current.setFieldsValue({
          username: nextState.classifyName.cat_name,
        })
      }
    }

    return true
  }
  //分页
  commodityList = (pageNum) => {
    this.productClassifyList(pageNum)
  }

  //编辑
  editUser = (e) => {
    // console.log(e)

    this.setState({
      visible: 1,
      classifyName: e,
    })
  }

  //删除
  roleDelete = (e) => {
    console.log(e)
    const that = this
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该分类, 是否继续?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const res = await that.$http.delete(`/categories/${e.cat_id}`)
        if (res.status === 200) {
          that.productClassifyList('1')
          message.success('删除该分类成功！')
        } else {
          message.success('删除该分类分类！')
        }
      },
      onCancel() {
        message.success('取消删除此分类')
      },
    })
  }

  handleOkAdd = async () => {
    const str = this.classification.current.submit()
    const tie = this.classification.current.getFieldValue()
    const res = await this.$http.put(
      `/categories/${this.state.classifyName.cat_id}`,
      {
        cat_name: tie.username,
      }
    )
    if (res.status === 200) {
      message.success('获取修改名称分类成功!')
      this.productClassifyList('1')
    }

    this.setState({
      visible: 0,
    })

    console.log(this.state.classifyName)
  }
  handleCancelAdd = () => {
    this.setState({
      visible: 0,
    })
  }
  comeHere = (ref) => {
    this.chirde = ref
  }
  //添加分类
  onAddWander = async () => {
    const res = await productClassify({
      type: 2,
    })
    if (res.meta.status === 200) {
      this.props.onClassification(res.data)
    } else {
      message.error('获取父级分类失败')
    }

    console.log('res', res)
    console.log(this.props)
    this.setState({
      visible: 2,
    })
  }
  onBirdie = async () => {
    console.log('11')
    let { username, cascader } = this.chirde.onFinish()
    if (cascader) {
      console.log(cascader.length)
      let a = ''

      if (cascader.length === 1) {
        a = 1
      } else {
        a = 2
      }
      cascader = cascader.pop()
      console.log('cascader', cascader)
      const res = await addProductClassify({
        cat_level: a,
        cat_name: username,
        cat_pid: cascader,
      })
      if (res.meta.status === 201) {
        message.success('添加分类成功!')
        this.productClassifyList('1')
        this.setState({
          visible: 0,
        })
      } else {
        message.error('添加分类失败!')
      }
      console.log(res)
    }
  }
  onClose = () => {
    this.setState({
      visible: 0,
    })
  }

  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 20 },
    }

    const { classifyList, total, visible, classifyName } = this.state
    const checkStrictly = false
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'cat_name',
        key: 'cat_name',
      },
      {
        title: '是否有效',
        dataIndex: 'cat_deleted',
        key: 'cat_deleted',
        align: 'center',
        render: (e) => {
          if (e) {
            return <CheckCircleOutlined />
          } else {
            return <CloseCircleOutlined />
          }
        },
      },
      {
        title: '排序',
        dataIndex: 'cat_level',
        key: 'cat_level',
        render: (e) => {
          if (e === 0) {
            return <Tag color="blue">一级</Tag>
          } else if (e === 1) {
            console.log('二级数据')
            return <Tag color="lime">二级</Tag>
          } else if (e === 2) {
            return <Tag color="magenta">三级</Tag>
          }
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (e) => {
          return (
            <span>
              <Button
                type="primary"
                onClick={() => {
                  this.editUser(e)
                }}
              >
                <EditOutlined /> 编辑
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  this.roleDelete(e)
                }}
                danger
                className="edit-button"
              >
                <DeleteOutlined />
                删除
              </Button>
            </span>
          )
        },
      },
    ]

    return (
      <div>
        <Button type="primary" onClick={this.onAddWander}>
          添加分类
        </Button>
        <Table
          bordered
          style={{ marginTop: '30px' }}
          columns={columns}
          rowKey="cat_id"
          dataSource={classifyList}
          pagination={{
            showQuickJumper: true,
            defaultPageSize: 5,
            total: total,
            onChange: (pageNum) => {
              this.commodityList(pageNum)
            },
          }}
        />

        {/* 编辑分类 */}
        <Modal
          title="编辑分类"
          visible={visible === 1}
          onOk={this.handleOkAdd}
          onCancel={this.handleCancelAdd}
        >
          <Form
            ref={this.classification}
            {...layout}
            name="basic"
            onFinish={this.onFinish}
            initialValues={{
              ['username']: classifyName.cat_name,
            }}
          >
            <Form.Item
              label="分类名称"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        {/* 添加分类 */}
        <Modal
          title="添加"
          visible={visible === 2}
          onOk={this.onBirdie}
          onCancel={this.onClose}
        >
          <Addclassify comeHere={this.comeHere} />
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClassification: (item) => {
      dispatch({
        type: 'ON_CLASSIFICATION',
        value: item,
      })
    },
  }
}

export default connect(null, mapDispatchToProps)(Categories)
