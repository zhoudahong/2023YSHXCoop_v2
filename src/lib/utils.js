export const handleYearAndMonth = (yearAndMonth) => {
    var month = ''
    if (yearAndMonth.toString().length == '6') {
        month = yearAndMonth.toString().substring(6, 4)
        if (parseInt(month) < 10) {
            month = month.substring(2, 1)
        }
    }
    return month
};


//处理来自多少个省，获得明细
export const handleProvinceDetail = (val) => {
    var result = [];
    if (val) {
        var arr = val.toString().split("|");
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i].split(",")[0])
            }
        } else {
            return result
        }
    }
    return result
};


/**
 * 转为数字
 * @param {*} val
 */
export const transformDigital = val => {
    if (typeof val === 'number') {
        return val
    }
    if (val) {
        return parseFloat(val)
    } else {
        return 0
    }
}


/**
 * 按字段进行倒序排序
 * @param {*} data 数据
 * @param {*} name 排序的字段
 */
export const bSort = (data, name) => {
    let arr = [...data]
    var len = arr.length
    if (len > 0) {
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                // 相邻元素两两对比，元素交换，大的元素交换到后面
                let current = arr[j][name] ? parseFloat(arr[j][name]) : 0
                let next = arr[j + 1][name] ? parseFloat(arr[j + 1][name]) : 0
                if (current > next) {
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
    } else {
        arr = []
    }
    return arr
}

/**
 * chart设置字体大小
 * @param {*} fs 字体大小
 */
export const fontChart = fs => {
    //获取到屏幕的宽度
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if (!clientWidth) return //报错拦截：
    if (clientWidth > 540) clientWidth = 540
    let fontSize = clientWidth / 375
    let dpr = window.lib.flexible.dpr || 1
    // 3倍屏显示已2进行处理
    if (dpr == 3) {
        dpr = 2
        // 2 已1进行处理
    } else if (dpr == 2) {
        dpr = 1.6
    } else {
        dpr = 1
    }

    return fs * fontSize * dpr
    // return Math.ceil(fs * fontSize)
}


export const fontChartDpr = (fs, add = 2) => {
    let dpr = window.lib.flexible.dpr || 1
    if (dpr == 3) {
        return fontChart(fs + add)
    }
    return fontChart(fs)
}


/*export const getTime = (date) => {
    let Y = date.getFullYear(),
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
        h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
        m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
        s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    // return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    return Y + '-' + M + '-' + D
}*/
