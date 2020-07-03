/* craco.config.js */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
               'primary-color': '#1DA57A',
               'link-color': '#1890ff',
               'success-color': '#52c41a', // 成功色
               'warning-color': '#faad14', // 警告色
               'error-color': '#f5222d'
           },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  externals:{
    'BMap':'BMap'
  }
};