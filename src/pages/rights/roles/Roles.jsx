import React, { Component } from 'react'
import { Button, Table, Tag, Row, Col, Modal, message } from 'antd'
import { optionalRole } from './../../../api/index'
import {
  DoubleRightOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import './roles.less'

const { confirm } = Modal
export default class Roles extends Component {
  constructor() {
    super()
    this.state = {
      tabulatedData: [],
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
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
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
    const { tabulatedData } = this.state
    return (
      <div>
        <Button type="primary" className="addUsers">
          添加
        </Button>
        <Table
          bordered
          columns={this.columns}
          rowKey="id"
          expandedRowRender={this.expandedRowRenderDel}
          dataSource={tabulatedData}
        />
      </div>
    )
  }
}
