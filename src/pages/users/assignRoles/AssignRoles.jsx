import React, { Component } from "react";
import { Row, Col, Form, Select } from "antd";
import { optionalRole } from "./../../../api/index";
import "./AssignRoles.less";

const { Option } = Select;
export default class AssignRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionalRoleDel: [],
    };

  
  }
  formRef = React.createRef()
  componentDidMount() {
    this.optionalRoleDel();
    this.props.onPopUp(this)
  }

  async optionalRoleDel() {
    const { data: res } = await optionalRole();
    this.setState({
      optionalRoleDel: res,
    });
    console.log(res);
  }
  onSubaggregate = ()=>{
    this.formRef.current.submit()

    console.log('------',this.formRef.current);
    
    const arr = this.formRef.current.getFieldsValue()
    return arr  
  }
  
  onChangeSelect = (e)=>{
    console.log('e',e);
    
  }

  render() {
    const currentInformation = this.props.currentInformation;
    const { optionalRoleDel } = this.state;
    return (
      <div>
        <Row className="character">
          <Col span={24}>当前用户名:{currentInformation.username}</Col>
        </Row>
        <Row className="character">
          <Col span={24}>当前的角色:{currentInformation.role_name}</Col>
        </Row>
        <Form  ref={this.formRef}  onFinish={this.onFinish}>
          <Form.Item
            name="select"
            label="请选择角色"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请选择角色",
              },
            ]}
          >
            <Select placeholder="可选角色" onChange={this.onChangeSelect}>
              {optionalRoleDel.map((element) => {
                return (
                  <Option value={element.id} key={element.id}>
                    {element.roleName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
