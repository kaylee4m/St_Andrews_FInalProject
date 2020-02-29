import Axios from 'axios'
import { Notification } from 'element-ui'
import Qs from 'qs'
// Axios.defaults.timeout = 5000;
Axios.defaults.baseURL = 'http://localhost:3000'



const http = ({ url, data = {}, method = 'post' }) => {
    const m = method.toLowerCase()
    const config = {
        method: m,
        url
    }
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers = {
            Authorization: 'Bearer ' + token
        }
    }
    if (m === 'get' || m === 'delete') {
        config.params = data
    } else {
        config.data = data
    }
    return new Promise((resolve, reject) => {
        Axios(config)
            .then(res => {
                if (res && res.data) {
                    return res.data
                } else {
                    reject()
                }
            })
            .then(data => {
                if (data.succ === true) {
                    return resolve(data.data)
                } else {
                    Notification({
                        title: '',
                        message: data.msg || 'error',
                        type: 'error'
                    });
                    return reject(data.message)
                }
            }).catch(err => {
                Notification({
                    title: '',
                    message: 'Network error',
                    type: 'error'
                });
            })
    })
}

export default http
