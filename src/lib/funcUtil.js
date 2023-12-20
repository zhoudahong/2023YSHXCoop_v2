exports.install = function (Vue, options) {
    Vue.prototype.isNotNull = function (val) { //全局函数1
        return val !== "0" & val !== "0%" & val != null & val !== "null" & val !== ""
    };

    Vue.prototype.getTime = function (time) { //将标准时间转换成年月日
        var date = new Date(time)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        var s = date.getSeconds()
        s = s < 10 ? ('0' + s) : s
        return  m + '月' + d+ '日'
    };

    Vue.prototype.getQueryString = function (param) { //全局函数1
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
    };


    //对地址栏的参数进行中文转义
    Vue.prototype.utf8to16 = function (str) { //全局函数1
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    };
}
