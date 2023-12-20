import axios from "axios"
import qs from "qs"
axios.defaults.baseURL = ".."
    // axios.defaults.timeout = 10000; //超时时间
    // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //请求头
export default {
    get(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: data
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}
// 请求拦截器
axios.interceptors.request.use((config) => {
        return config;
    })
    // 响应拦截器
axios.interceptors.response.use((response) => {
    return response;
})

// // 请求拦截器
// axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token_driver')
//         token  &&  (config.headers.components["Authorization"]  =  token);  
//         return config;
//     },
//     error => {
//         return Promise.error(error);
//     }
// )

// // 响应拦截器
// axios.interceptors.response.use(res => {
//     if (res.code == 200) {
//         return Promise.resolve(res);
//     } else {
//         return Promise.resolve(res);

//     }
// }, err => {
//     console.log(err);
// })
