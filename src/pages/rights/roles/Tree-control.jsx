import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tree } from 'antd'
import { treeJurisdiction } from './../../../api/index'

class TreeControl extends Component {
  constructor(props) {
    super(props)
    this.treecibtrol = React.createRef()
    this.state = {
      permissionList: '',
      treeList: [],
      pitchOnTree: [],
      pre: '',
      keyArray: [],
    }
  }
  componentDidMount() {
    //树形控件
    this.allControls()

    this.props.onControldel(this)
    console.log(this.props)
  }
  componentWillMount() {
    let arr = this.props.todo

    this.updateUsing(arr)

    // this.props.authorityDistribution(checkbox)
  }

  updateUsing(arr) {
    console.log('arr', arr)
    let checkbox = []
    this.districtRecursion = (arr) => {
      arr.map((element) => {
        if (element.children) {
          this.districtRecursion(element.children)
        }
        if (!element.children) {
          return checkbox.push(element.id + '')
        }
        return checkbox
      })
    }
    this.districtRecursion(arr)
    console.log('checkbox', checkbox)
    this.setState({
      pitchOnTree: checkbox,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.updateUsing(nextProps.todo)
  }

  allControls = async () => {
    const res = await treeJurisdiction()
    var that = this
    //请求的数据转换为Tree格式的数据
    if (res.meta.status === 200) {
      let mock = res.data
      let cigarette = []
      this.getTreeNodes = (menuList) => {
        let item = []
        menuList.map((list) => {
          let newData = {}
          newData.key = list.id + ''
          cigarette.push(list.id + '')
          newData.title = list.authName
          if (list.children) {
            newData.children = this.getTreeNodes(list.children)
          }
          item.push(newData)
        })
        return item
      }
      this.setState({
        permissionList: this.getTreeNodes(mock),
        pre: cigarette,
      })
    }
  }
  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys, info)
  }

  onCheck = (checkedKeys, info) => {
    const checkedKeysResult = [...checkedKeys, ...info.halfCheckedKeys]
    console.log('checkedKeysResult', checkedKeysResult)
    this.setState({
      pitchOnTree: checkedKeysResult,
    })
  }
  thinking = () => {
    return this.state.pitchOnTree
  }
  render() {
    const { permissionList, pitchOnTree, pre } = this.state
    return (
      <div ref={this.treecibtrol}>
        {/* 渲染之前先判断有没有数据，有数据再渲染，没有数据不渲染，这样就起作用了！ */}
        {permissionList && permissionList.length ? (
          <Tree
            checkable
            defaultExpandAll={true}
            defaultCheckedKeys={[...pitchOnTree]}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
            treeData={permissionList}
          />
        ) : (
          '暂无数据'
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.addUser.addTree,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authorityDistribution: (item) => {
      dispatch({
        type: 'PITCH_ON_CONTROL',
        keys: item,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeControl)
