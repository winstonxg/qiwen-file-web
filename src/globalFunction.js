//全局函数 ，挂载到Vue实例上
export default function install (Vue) {
  /**
   * checkIsLogin(params) 页面内某些功能需要用户登录时调用,调用示例如下
   * let res = this.checkIsLogin(this.$route.fullPath);
   * if(res === true) {
   *  // 做些什么......
   * }
   * 其中，参数为当前页面的全部路由fullPath（即包括query等参数）
   */
  //  检测用户登录状态并做相应的跳转
  Vue.prototype.checkIsLogin = function (params) {
    if (this.$store.state.isLogin == false) { // 未登录时自动跳转到登录页面，并将当前页面的路由作为query传递给登陆页面
      this.$router.push({ path: '/login', query: { Rurl: params } });
    } else {
      return true
    }
  };
  //  处理用户头像
  Vue.prototype.fixUserImg = function (params) {
    if(params) {
      if(!params.includes('http')) {
        params = '/api' + params.split(".")[0] + "_min." + params.split(".")[1]
      }
    } else {
      params = '/api'
    }
    return params
  };
  //  区分跳转到个人主页or作者主页
  Vue.prototype.fixHomeByUserId = function (params) {
    if(params === this.$store.state.userId) {
      return { path: '/personalHome/essay' }
    } else {
      return { name: 'AuthorHomeEssayList', params: { userId: params } }
    }
  };
  //  加载缩略图
  Vue.prototype.downloadImgMin = function (params) {
    return params.split(".")[0] + "_min." + params.split(".")[1]
  };
  /**
   * 当然，你还可以在这里封装并挂载更多的全局函数在这里，示例同上
   */
}