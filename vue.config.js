module.exports = {
  // 配置别名
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        // router 不用配置，因为好多地方可以直接this.$router

      }
    }
  }
}