import axios from "axios"
import CustomToast from "../../components/widgets/custom-toast"
import { getTemplateArea } from "./default"

export default class FetchServices {
    axiosService
    baseUrl = "https://apis-redesign.underdev.team"
    token = ""

    constructor(_token) {
        this.axiosService = axios
        const envi = process.env.NODE_ENV
        this.baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? window._env_.REACT_APP_API_GATEWAY : process.env.REACT_APP_API_GATEWAY

        if (_token == undefined || _token == null) {
            this.token = "Bearer " + window.localStorage.getItem("token")
        } else {
            this.token = _token
        }
        this.header = this.defaultHeader()
    }

    defaultHeader() {
        const accessControlOrigin = ".underdev.team, .siaccinfo.id, localhost:3000, localhost:3001, .mapbox.com, .test-siaccinfo.id, .siaccinfo.my.id "

        const headers = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "*/*",
            "Access-Control-Allow-Origin": accessControlOrigin,
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0"
        } : {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "*/*",
            "Access-Control-Allow-Origin": accessControlOrigin,
            "Authorization": this.token,
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0"
        }
        return headers
    }

    get(path, params) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            this.axiosService({
                method: "get",
                url: url,
                params: params,
                headers: { ...this.header },

            }).then(response => {
                resolve(response)
            }).catch(err => {
                if (err.response) {
                    this.redirectlogout(err)
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    post(path, formData, params) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: url,
                data: formData,
                params: params,
                headers: { ...this.header }
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                if (err.response) {
                    if (path != "login") {
                        this.redirectlogout(err)
                    }
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    postMultipart(path, formData, options) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: url,
                data: formData,
                headers: {
                    ...this.header,
                    "Content-Type": "multipart/form-data",
                },
                ...options
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                if (err.response) {
                    this.redirectlogout(err)
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    putMultipart(path, formData) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            axios({
                method: "put",
                url: url,
                data: formData,
                headers: {
                    ...this.header,
                    "Content-Type": "multipart/form-data",
                }
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                if (err.response) {
                    this.redirectlogout(err)
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    put(path, formData, params) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            axios({
                method: "put",
                url: url,
                data: formData,
                params: params,
                headers: { ...this.header }
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                if (err.response) {
                    this.redirectlogout(err)
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    delete(path, formData, params) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            axios({
                method: "delete",
                url: url,
                data: formData,
                params: params,
                headers: { ...this.header }
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                if (err.response) {
                    this.redirectlogout(err)
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    deleteMultipart(path, formData) {
        const url = `${this.baseUrl}/${path}`
        const promise = new Promise((resolve, reject) => {
            axios({
                method: "delete",
                url: url,
                data: formData,
                headers: {
                    ...this.header,
                    "Content-Type": "multipart/form-data",
                }
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                if (err.response) {
                    this.redirectlogout(err)
                    reject(err.response)
                } else if (err.request) {
                    reject(err.request)
                } else {
                    reject(err)
                }
            })
        })
        return promise
    }

    redirectlogout = (err) => {
        if (err.response.status == 410) {
            // Redirect them to the /login page, but save the current location they were
            // trying to go to when they were redirected. This allows us to send them
            // along to that page after they login, which is a nicer user experience
            // than dropping them off on the home page.
            localStorage.clear()
            window.location.href = "/"
        }
    }

    mapboxGeo = (query, accessToken) => {

        // const url = !process.env.NODE_ENV || process.env.NODE_ENV == "production" ? "https://api.mapbox.com/" + getTemplateArea(query, accessToken) : getTemplateArea(query, accessToken);
        const url = "https://api.mapbox.com/" + getTemplateArea(query, accessToken);
        const promise = new Promise((resolve, reject) => {
            axios.get(url, { withCredentials: false }).then(e => {
                resolve(e)
            }).catch(err => {
                CustomToast("danger", "Mapbox Failed")
                reject(err)
            })
        })
        return promise
    }
}