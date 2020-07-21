import React, { Component } from 'react'
import { Button, Table, Tag, Row, Col, Modal, message } from 'antd'
import { optionalRole, addRole } from './../../../api/index'
import {
  DoubleRightOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingFilled,
} from '@ant-design/icons'
import './roles.less'
import EditFrom from './Edit-from'

const { confirm } = Modal
export default class Roles extends Component {
  constructor() {
    super()
    this.state = {
      tabulatedData: [],
      visible: false,
      userJudge: '',
    }
  }
  componentDidMount() {
    this.permissionList()
    this.initColumns()
  }

  permissionList = async () => {
    const { data: res } = await optionalRole()
    this.setState({
      tabulatedData: res,
    })
  }
  initColumns = () => {
    this.columns = [
      {
        title: '#',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
      { title: '角色描述', dataIndex: 'roleDesc', key: 'roleDesc' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
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
              <Button type="primary">
                <SettingFilled /> 分配权限
              </Button>
            </span>
          )
        },
      },
    ]
  }

  //根据id删除子集
  deleteLevel = (data, record) => {
    console.log(data, record)
    let that = this
    confirm({
      title: '提示?',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前权限',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const { data: res } = await that.$http.delete(
          `roles/${record}/rights/${data}`
        )
        if (res.meta.status == 200) {
          message.success('删除当前权限成功')
          record.children = res.data
        } else {
          message.error('删除当前权限失败')
        }
      },
      onCancel() {
        message.success('取消删除当前权限')
      },
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      userJudge: '添加用户',
    })
  }
  graceful = (ref) => {
    this.children = ref
    console.log(ref)
  }

  handleOk = async (e) => {
    const vicissitude = this.children.onFinish()
    if (vicissitude.roleName && vicissitude.roleDesc) {
      const data = await addRole(vicissitude)
      if (data.meta.status === 201) {
        message.success('添加角色成功')
        this.permissionList()
      } else {
        message.error('添加角色失败')
      }
      this.setState({
        visible: false,
      })
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  //删除角色
  roleDelete = (e) => {
    console.log(e)
    const that = this
    confirm({
      title: '提示！',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前角色',
      async onOk() {
        console.log('OK')
        const { data: res } = await that.$http.delete(`roles/${e.id}`)
        if (res.meta.status == 200) {
          message.success('删除当前角色成功')
        } else {
          message.error('删除当前角色失败')
        }
      },
      onCancel() {
        message.success('取消删除当前角色')
      },
    })
  }

  //编辑角色
  editUser = (e) => {
    console.log(e)
    this.setState({
      visible: true,
      userJudge: '编辑用户',
    })
  }

  expandedRowRenderDel = (record) => {
    return (
      <div className="rowCol">
        {record.children.map((element) => {
          return (
            <Row key={element.id} className="concreteness">
              <Col span={5} size={50}>
                <Tag
                  color="#409EFF"
                  key={element.id}
                  onClick={() => {
                    this.deleteLevel(element.id, record.id)
                  }}
                >
                  {element.authName} <CloseOutlined />
                </Tag>
                <DoubleRightOutlined />
              </Col>
              <Col span={19}>
                {element.children.map((item) => {
                  return (
                    <div className="concretenessSubset " key={item.id}>
                      <span className="market">
                        <Tag
                          color="#67c23a"
                          onClick={() => {
                            this.deleteLevel(item.id, record.id)
                          }}
                        >
                          {item.authName}
                          <CloseOutlined />
                        </Tag>
                        <DoubleRightOutlined />
                      </span>
                      <span className="finally">
                        {item.children.map((res) => {
                          return (
                            <span key={res.id}>
                              <Tag
                                color="#e6a23c"
                                onClick={() => {
                                  this.deleteLevel(res.id, record.id)
                                }}
                              >
                                {res.authName} <CloseOutlined />
                              </Tag>
                            </span>
                          )
                        })}
                      </span>
                    </div>
                  )
                })}
              </Col>
            </Row>
          )
        })}
      </div>
    )
  }
  render() {
    const { tabulatedData, visible, userJudge } = this.state
    return (
      <div>
        <Button type="primary" className="addUsers" onClick={this.showModal}>
          添加角色
        </Button>
        <Table
          bordered
          columns={this.columns}
          rowKey="id"
          expandedRowRender={this.expandedRowRenderDel}
          dataSource={tabulatedData}
        />

        <Modal
          title={userJudge}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <EditFrom graceful={this.graceful} />
        </Modal>
      </div>
    )
  }
}
