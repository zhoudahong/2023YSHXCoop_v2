<script>
  export default {
    created() {
        console.log("进入了clear、、、、、")
      window.localStorage.clear() // 客户端访问地址：http://dsj.xnyy.cn/yltj#Clear
      this.$router.push('/Auth')
    },
    methods: {
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
