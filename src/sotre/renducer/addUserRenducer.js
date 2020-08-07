//默认定义一个空对象

export default (state = {}, action) => {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.addUser = action.value
    return newState
  }

  if (action.type === 'CONSTANT_CLICK_TREE') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.addTree = action.tree
    return newState
    // newState.addUser = action.value
    // return newState
  }

  if (action.type === 'PITCH_ON_CONTROL') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.keys = action.keys
    return newState
  }

  if (action.type === 'ON_CLASSIFICATION') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.commodityClassification = action.value
    return newState
  }
  return state
}
