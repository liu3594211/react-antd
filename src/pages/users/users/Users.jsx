import React, { Component } from "react";
import { Input, Row, Col, Button,Table,Switch,message,Modal,Space } from "antd";
import { AudioOutlined ,EditOutlined,DeleteOutlined,SettingFilled,ExclamationCircleOutlined} from "@ant-design/icons";
import {administratorList,commoditySoldutTul,fillForm} from './../../../api/index'
import AddUser from './../addUser/adduser'
import './user.less'
const { Search } = Input;
const { confirm } = Modal;

export default class Users extends Component {  
  constructor(props){
    super()
    this.state = {
      dataSource: [], //列表数据
      total:'', //数据总数
      visible: false,
      confirmLoading: false,
    }
  }
  componentWillMount(){
    this.initColumns();
    this.tabulatedDate()
  }
  //列表数据
   tabulatedDate = async ()=>{
      const res = await administratorList({
        pagenum: 1,
        pagesize: 2
      })
       this.setState({
        dataSource:res.data.users,
        total:res.data.total
       })     
  }
  //分页处理
  commodityList = async (pageNum)=>{
     const res = await administratorList({
      pagenum: pageNum,
      pagesize: 2
    })
    this.setState({
      dataSource:res.data.users,
      total:res.data.total
     })
  } 
  initColumns = ()=>{
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        align: 'center',
      },
      {
        title: '电话',
        dataIndex: 'create_time',
        align: 'center',
      },
      {
        title: '角色',
        dataIndex: 'role_name',
        align: 'center',
      },
      {
        title: '状态',
        render:tags=> {
              return (
                <span>
                   <Switch defaultChecked={tags.mg_state}             
                    onChange={()=>{
                this.commoditySoldut(tags)
                }} />
                </span>
              )             
        },
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render:tags=>{
          return (
            <span>
              <Button type="primary" className='btnIcons' icon={<EditOutlined />}> 修改</Button> 
              <Button  onClick={()=>{
                this.showDeleteConfirm(tags)
              }} className='btnIcons' type="primary" icon={<DeleteOutlined />}></Button>
              <Button className='btnIcons' type="primary" icon={<SettingFilled />}></Button>
            </span>
          )
        }
      },
    ];
  }

  //状态开关
  commoditySoldut = async (tags)=>{
    const data = await this.$http.put(`users/${tags.id}/state/${!tags.mg_state}`)
    if(data.status === 200){
      message.success('修改状态成功')
      this.tabulatedDate()
    } 
  }

  //搜索
  onSearchBtns = async (value)=>{
    const data = await fillForm({
      query:value,
      pagenum: 1,
      pagesize: 2
    })
     this.setState({
      dataSource:data.data.users,
      total:data.data.total
     })
  }

  //删除
  showDeleteConfirm = (res)=>{
    console.log('res',res);
    let that = this
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该用户, 是否继续?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
     async onOk() {
      const data = await that.$http.delete('users/' + res.id)
        if(data.status === 200){
          message.success('删除用户成功')
          that.tabulatedDate()
        } else {
          message.error('删除用户失败')
        }     
      },
      onCancel() {
        message.success('取消删除当前用户')
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
    const {dataSource,total, visible, confirmLoading} = this.state
    return (
      <div>
        <Row gutter={32} className='composing'>
          <Col span={8}>
            <Search
            allowClear={true}
              placeholder="input search text"             
              onSearch={(value)=>{
                this.onSearchBtns(value)
              }}
              enterButton
            />
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.showModal}>添加用户</Button>
          </Col>
        </Row>
        <Table
       columns={this.columns}
       dataSource={dataSource}
       pagination={{ 
         showQuickJumper:true,
         defaultPageSize:2,
         total:total,
         onChange:pageNum =>{
          this.commodityList(pageNum)
         }
         }}
       bordered
       rowKey="id" 
     />  
     {/* 添加弹框  */}
     <Modal
          title="添加用户"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
         <AddUser />
        </Modal>
      </div>
    );
  }
}
