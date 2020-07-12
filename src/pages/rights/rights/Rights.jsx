import React, { Component } from 'react'
import { jurisdictionList } from './../../../api/index'
import { Table, Tag, Space } from 'antd'
export default class Rights extends Component {
  constructor() {
    super()
    this.state = {
      tabulatedData: [],
    }
  }
  componentDidMount() {
    this.initColumns()
    this.jurisdictionList()
  }

  jurisdictionList = async () => {
    const { data: res } = await jurisdictionList()
    console.log(res)
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
      {
        title: '权限名称',
        dataIndex: 'authName',
        key: 'authName',
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '权限等级',
        dataIndex: 'level',
        key: 'level',
        render: (text) => {
          if (text == 0) {
            return <Tag color="#f50">一级标签</Tag>
          } else if (text == 1) {
            return <Tag color="#2db7f5">二级标签</Tag>
          } else {
            return <Tag color="#87d068">三级标签</Tag>
          }
        },
      },
    ]
  }

  onClickBtns = (text) => {
    console.log(text)
  }

  render() {
    return (
      <div>
        <Table
          bordered
          columns={this.columns}
          rowKey="id"
          dataSource={this.state.tabulatedData}
        />
      </div>
    )
  }
}
