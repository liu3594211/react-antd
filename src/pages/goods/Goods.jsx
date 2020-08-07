import React, { Component } from 'react'
import {
  Input,
  Row,
  Col,
  Table,
  Tag,
  Space,
  message,
  Modal,
  Button,
  Pagination,
} from 'antd'
import {
  AudioOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { productList } from './../../api/index'
import './good.less'
const { Search } = Input
const { confirm } = Modal
export default class Goods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagenum: 1,
      pagesize: 10,
      productTable: '',
      total: '',
    }
  }
  //搜索
  onSearchsel = (value) => {
    this.productCatalogue(value)
  }
  //删除啊
  roleDelete = (e) => {
    const that = this
    console.log(e.goods_id)
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除此商品吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const res = await that.$http.delete(`/goods/${e.goods_id}`)
        console.log(res)
        if (res.status === 200) {
          message.success('删除商品成功！')
          that.productCatalogue('')
        } else {
          message.error('删除失败,请重试')
        }
      },
      onCancel() {
        message.success('取消删除此商品')
      },
    })
  }

  componentDidMount() {
    this.productCatalogue('')
  }

  productCatalogue = async (query) => {
    const res = await productList({
      query: query,
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize,
    })
    console.log(res)
    if (res.meta.status === 200) {
      this.setState({
        productTable: res.data.goods,
        total: res.data.total,
      })
      message.success('商品列表加载成功!')
    }
  }

  //分页
  commodityList = async (pageNum) => {
    const res = await productList({
      pagenum: pageNum,
      pagesize: this.state.pagesize,
    })
    console.log(res)
    if (res.meta.status === 200) {
      this.setState({
        productTable: res.data.goods,
        total: res.data.total,
      })
    }
  }

  //添加商品
  addCommodityDetails = () => {
    this.props.history.push('/additem')
  }

  editUser = () => {}

  render() {
    const columns = [
      {
        title: '#',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '商品名称',
        dataIndex: 'goods_name',
        key: 'goods_name',
      },
      {
        title: '商品价格(元)',
        dataIndex: 'goods_price',
        key: 'goods_price',
      },
      {
        title: '商品重量',
        dataIndex: 'goods_weight',
        key: 'goods_weight',
      },
      {
        title: '创建时间',
        dataIndex: 'add_time',
        key: 'add_time',
        render: (value) => {
          const dt = new Date(value)
          // 返回年数的四位数方法
          const y = dt.getFullYear()
          // 月份从0开始，所有要加1，如果不足两位用es6字符串方法补0
          const m = (dt.getMonth() + 1 + '').padStart(2, '0')
          const d = (dt.getDate() + 1 + '').padStart(2, '0')

          const hh = (dt.getHours() + '').padStart(2, '0')
          const mm = (dt.getMinutes() + '').padStart(2, '0')
          const ss = (dt.getSeconds() + '').padStart(2, '0')
          return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        },
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
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

    const { productTable, total } = this.state
    return (
      <div>
        <Row>
          <Col span={8} style={{ marginRight: '50px' }}>
            <Search
              placeholder="input search text"
              onSearch={(val) => {
                this.onSearchsel(val)
              }}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={4}>
            {' '}
            <Button type="primary" onClick={this.addCommodityDetails}>
              添加商品
            </Button>
          </Col>
        </Row>
        <div className="tables">
          <Table
            bordered
            columns={columns}
            pagination={{
              showQuickJumper: true,
              defaultPageSize: 10,
              total: total,
              onChange: (pageNum) => {
                this.commodityList(pageNum)
              },
            }}
            rowKey="goods_id"
            dataSource={productTable}
          />
        </div>
      </div>
    )
  }
}
