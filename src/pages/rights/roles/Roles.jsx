import React, { Component } from 'react'
import { Button, Table, Tag, Row, Col, Modal, message, Pagination } from 'antd'
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
import { connect } from 'react-redux'
import TreeControl from './Tree-control'
import EditFrom from './Edit-from'

const { confirm } = Modal
class Roles extends Component {
  constructor() {
    super()
    this.state = {
      tabulatedData: [],
      visible: 0,
      userJudge: '',
      checkBox: false,
      roles_id: '',
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
              <Button
                type="primary"
                onClick={() => {
                  this.authorityDistribution(e)
                }}
              >
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
      visible: 1,
      userJudge: '添加用户',
    })
  }
  graceful = (ref) => {
    console.log('编辑的ref', ref)
    this.children = ref
  }

  //添加用户
  handleOk = async () => {
    const vicissitude = this.children.onFinish()
    if (this.state.userJudge === '添加用户') {
      if (vicissitude.roleName && vicissitude.roleDesc) {
        const data = await addRole(vicissitude)
        if (data.meta.status === 201) {
          message.success('添加角色成功')
          this.permissionList()
          this.children.resetFields()
        } else {
          message.error('添加角色失败')
        }
        this.setState({
          visible: 0,
        })
      }
    } else {
      const res = await this.$http.put(`/roles/${this.props.todo.addUser.id}`, {
        ...vicissitude,
        roleId: this.props.todo.addUser.id,
      })
      if (res.status === 200) {
        message.success('修改修改角色成功')
        this.permissionList()
      } else {
        message.success('修改修改角色失败')
      }
      this.setState({
        visible: 0,
      })
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: 0,
    })
  }

  //删除角色
  roleDelete = (e) => {
    const that = this
    confirm({
      title: '提示！',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前角色',
      async onOk() {
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
    this.props.onIncreateClick(e)
    this.setState({
      visible: 1,
      userJudge: '编辑用户',
    })
  }

  //分配权限
  authorityDistribution = (e) => {
    this.props.onIncreateClickTree(e.children)
    this.setState({
      visible: 2,
      checkBox: true,
      roles_id: e.id,
    })
  }

  onControldel = (a) => {
    this.treeControlcur = a
  }

  //确定权限
  confirmTree = async () => {
    console.log('777', this.treeControlcur.thinking())
    let think = this.treeControlcur.thinking()
    const arr = []
    think.forEach((element) => {
      arr.push(parseInt(element))
    })
    const str = arr.join(',')
    const res = await this.$http.post(`/roles/${this.state.roles_id}/rights`, {
      rids: str,
    })
    console.log('res', res)
    if (res.status === 200) {
      message.success('分配权限成功')
      this.permissionList()
    } else {
      message.error('分配失败成功')
    }
    this.setState({
      visible: 0,
      checkBox: false,
    })
    if (think.length > 0) {
    } else {
    }
  }

  jurisdiction = () => {
    // document.location.reload()
    this.setState({
      visible: 0,
      checkBox: false,
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
    const { tabulatedData, visible, userJudge, checkBox } = this.state
    const PopUp = () => {
      if (checkBox) {
        return (
          <div>
            <Modal
              title={userJudge}
              visible={visible === 2}
              onOk={this.confirmTree}
              onCancel={this.jurisdiction}
            >
              <TreeControl onControldel={this.onControldel} />
            </Modal>
          </div>
        )
      } else {
        return <div></div>
      }
    }

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
          visible={visible === 1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <EditFrom graceful={this.graceful} />
        </Modal>

        <PopUp />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncreateClick: (item) => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        value: item,
      })
    },
    onIncreateClickTree: (item) => {
      dispatch({
        type: 'CONSTANT_CLICK_TREE',
        tree: item,
      })
    },
  }
}
const mapStateToProps = (state) => {
  return {
    todo: state.addUser,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles)
