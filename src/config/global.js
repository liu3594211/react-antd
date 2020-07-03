//写好方法，哪里要用就直接调用
// 本地化存储
export const setLocalStore = (name, content) => {
    //先判断是否有键名，没有的话就return 空
    if (!name) return;
    //然后判断传过来的数据类型是不是字符串，如果不是字符串的话就转为字符串
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    //然后存储在本地存储中
    window.localStorage.setItem(name, content);
  };
  
  // 本地化获取
  export const getLocalStore = (name) => {
    if (!name) return;
    return window.localStorage.getItem(name);
  }
  
  // 本地化删除
  export const removeLocalStore = (name) => {
    if (!name) return;
    return window.localStorage.removeItem(name);
  }
  