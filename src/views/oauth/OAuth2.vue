<script>
  import axios from 'axios'

  export default {
    created() {
        console.log("进入了oauth2.。。。。。。。。。。")

      if (window.localStorage.getItem('dept_name') == null || window.localStorage.getItem('dept_name') == ''
        || window.localStorage.getItem('UserId') == null || window.localStorage.getItem('UserId') == ''
      ) // 科室名称或者UserId不存在，需要先进行身份认证
      {
        let mycode = this.getUrlParam('code')
        if (mycode == null || mycode == '') {
          this.getCode()//进入企业微信认证，获取code
        } else {
          const params = new URLSearchParams()
          mycode = this.getUrlParam('code') //获取到重定向的链接中的code参数值
          params.append('code', mycode) //将code参数值作为接口访问参数，来获取科室和用户名，"全院|ZEH226019"

          // axios.get('/EWechatAPI/deptapi/Dept/' + mycode)
          axios.post('http://61.186.173.203:54441/api/Ewechat/', params)
            .then(res => {
              window.localStorage.setItem('dept_name', res.data.split('|')[0])
              window.localStorage.setItem('UserId', res.data.split('|')[1])

              console.log("oauth dept_name:" + window.localStorage.getItem('dept_name'))
              console.log("oauth UserId:" + window.localStorage.getItem('UserId'))

              var hrefUrl = "http://dsj.xnyy.cn/yltj/yearly/#/"
              var departmentUrl = "http://dsj.xnyy.cn/yltj/yearly/#/department/"

              if (window.localStorage.getItem('dept_name') == null || window.localStorage.getItem('dept_name') == '40029'
                || window.localStorage.getItem('dept_name') == '' || window.localStorage.getItem('dept_name') == '全院') {//院级
                window.localStorage.setItem('dept_name', '全院')
                // 原始写法
                // this.$router.push('/' + this.getUrlParam('page'))
                if (this.getQueryString('param_date') != null || this.getQueryString('param_date') != '') {
                  window.location.href = hrefUrl + this.getQueryString('page') + '?param_date=' + this.getQueryString('param_date')
                  // this.$router.push('/' + this.getQueryString('page')+ '?param_date=' + this.getQueryString('param_date'))
                  console.log("IF 1")
                  // this.$router.push({ name: 'Today', params: { param_date: this.getQueryString('param_date') } })
                } else {
                  console.log("else 1")
                  window.location.href = hrefUrl + this.getQueryString('page')
                  // this.$router.push('/' + this.getQueryString('page'))
                }
              } else {//科级
                // 原始写法
                // this.$router.push('/department/' + this.getQueryString('page'))
                if (this.getQueryString('param_date') != null || this.getQueryString('param_date') == '') {
                  console.log("IF 2")
                  // this.$router.push('/department/' + this.getQueryString('page')+ '?param_date=' + this.getQueryString('param_date'))
                  window.location.href = departmentUrl + this.getQueryString('page') + '?param_date=' + this.getUrlParam('param_date')
                } else {
                  console.log("else 2")
                  // this.$router.push('/department/' + this.getQueryString('page'))
                  window.location.href = departmentUrl + this.getQueryString('page')
                }
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else if (window.localStorage.getItem('dept_name') == '40029') // 科室名称获取失败重新获取
      {
        window.localStorage.clear()
        this.getCode()
      } else {
        this.$router.push('/' + this.getQueryString('page'))
      }
    },
    methods: {
      getCode() {
        const APPID = 'wx19cc55bb48ab7ee8' // 企业ID
        const URI = window.location.href // 授权后重定向的回调链接地址，使用urlencode对链接进行处理
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID
          + '&redirect_uri=' + encodeURIComponent(URI)
          + '&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'
        // + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      },
      getUrlParam(param) {
        const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      getQueryString(param) { //param为要获取的参数名 注:获取不到是为null
        const currentUrl = window.location.href  //获取当前链接
        let arr = currentUrl.split('?')//分割域名和参数界限
        if (arr.length > 1) {
          arr = arr[1].split('&')//分割参数
          for (let i = 0; i < arr.length; i++) {
            const tem = arr[i].split('=') //分割参数名和参数内容
            if (tem[0] == param) {
              return tem[1]
            }
          }
          return null
        } else {
          return null
        }
      }
    }
  }
</script>
