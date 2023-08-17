import axios from 'axios'
import { BASE_URL,BASE_URL_1,TIMEOUT } from './config'
import useMainStore from '../../stores/modules/main'
// import token from '../../hooks/useToken'

const mainStore = useMainStore()

class ASRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      const access_token = localStorage.getItem('access_token')
      const refresh_token = localStorage.getItem('refresh_token')
      config.headers={
        // ...config.headers,
        "access_token": access_token,
        "refresh_token": refresh_token
      }
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isLoading = false
      }).catch(err => {
        reject(err)
        // mainStore.isLoading = false
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export const ASRequest1 = new ASRequest(BASE_URL_1, TIMEOUT)
export default new ASRequest(BASE_URL, TIMEOUT)


