import Vue from 'vue'

Vue.filter('handleOperationName', val => {
    var arr = [""];
    if (val) {
        if (val.toString().split("|").length == 2) {
            arr = val.split("|")
            //如果是数字，且小于0，单独处理。例如.95处理成0.95
            var first = arr[0].toString().split(".")
            if (arr[0].toString().slice(0, 1) == ".") {
                arr[0] = "0." + first[1]
            }
        } else {
            return ""
        }
    }
    return arr[0]
});

Vue.filter('handleOperationNum', val => {
    var arr = [];
    if (val) {
        if (val.toString().split("|").length == 2) {
            arr = val.split("|")
            //如果是数字，且小于0，单独处理。例如.95处理成0.95
            var first = arr[0].toString().split(".")
            if (arr[1].toString().slice(0, 1) == ".") {
                arr[1] = "0." + first[1]
            }
        }
    }
    return arr[1]
});

Vue.filter('mathAbs', val => {
    console.log("mathAbs val", val)
    var abs = Math.abs(val.split("%")[0])
    if (val > 0) {
        if (abs > 100) {
            abs = abs + '倍'
        }
    } else {
    }
    return abs
});

Vue.filter('handleBirthday', val => {
    var result = "";
    if (val) {
        var arr = val.toString().split("/");
        if (arr.length == 3) {
            result = arr[1] + "月" + arr[2] + "日"
        }
    }
    return result
});


//处理来自多少个省，获得总数
Vue.filter('handleProvinceTotal', val => {
    var result = 0;
    if (val) {
        var arr = val.toString().split("|");
        if (arr.length > 0) {
            result = arr.length
        } else {
            return result
        }
    }
    return result
});

//判断字段是否不为"0"、"0%"、null、"null"
// Vue.filter('isNotNull', val => {
//     return val!="0" & val!="0%" & val!=null & val!="null"
// });
