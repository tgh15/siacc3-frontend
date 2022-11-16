import axios                                from 'axios';

const rootPath       = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? window._env_.REACT_APP_API_GATEWAY : process.env.REACT_APP_API_GATEWAY

const configHeaders  = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? {
    "Content-Type"                  : "application/json",
    "Access-Control-Allow-Origin"   : window._env_.REACT_APP_CORS_ORIGIN,
    'Cache-Control'                 : 'no-cache',
    'Pragma'                        : 'no-cache',
    'Expires'                       : '0',
} : {
    "Content-Type"                  : "application/json",   
    "Authorization"                 : "Bearer " + localStorage.getItem("token"), 
    "Access-Control-Allow-Origin"   : ".underdev.team, .siaccinfo.id, localhost:3000, localhost:3001, .mapbox.com, .test-siaccinfo.id, .siaccinfo.my.id, .underdev.team, .arcgis.com",
    'Cache-Control'                 : 'no-cache',
    'Pragma'                        : 'no-cache',
    'Expires'                       : '0',
};

const redirectlogout = (err) => {
    if (err.data.status == 401) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        localStorage.clear();
        window.location.href = "/"
    }
}

export const Get = (path, params) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method      : 'get',
            url         : `${rootPath}/${path}`,
            params      : params,
            headers     : configHeaders,
        }).then(
            res => {
                // if(res.data.is_error && res.data.message === 'pengguna telah keluar dari aplikasi'){
                //     redirectlogout(res)
                // }else{
                // }
                resolve(res.data);
            },
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });
    return promise;
};

export const GetWithURL = (path) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method          : 'get',
            url             : `${path}`,
            headers         : configHeaders,
            withCredentials : false
        }).then(
            res => {
                resolve(res.data);
            }
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });
    return promise;
};

export const GetDashboardData = (path) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method          : 'get',
            url             : `${path}`,
            headers         : configHeaders,
        }).then(
            res => {
                resolve(res.data);
            }
        ).catch(
            err => {
                if(err.response){
                    redirectlogout(err)
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });
    return promise;
};

export const Post = (path, formData, params) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method  : 'post',
            url     : `${rootPath}/${path}`,
            data    : formData,
            params  : params,
            headers : configHeaders,
        }).then(
            res => {
                resolve(res.data);
            }
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });
    return promise;
};

export const postDownload = (path, formData, fileName) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method          : 'post',
            url             : `${rootPath}/${path}`,
            data            : formData,
            responseType    : 'blob',
            headers         : configHeaders
        }).then(
            res => {
                const url       = window.URL.createObjectURL(new Blob([res.data]));
                const link      = document.createElement('a');

                link.href       = url;

                link.setAttribute('download', fileName);
                document.body.appendChild(link);

                const result    =  link.click();

                resolve(result);
            }
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });

    return promise;
};

export const PostUpload = (path, formData, onUploadProgress) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method  : 'post',
            url     : `${rootPath}/${path}`,
            data    : formData,
            headers : configHeaders,
            onUploadProgress
        }).then(
            res => {
                resolve(res.data);
            }
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });

    return promise;
};

export const Put = (path, formData, params) => {
    
    const promise = new Promise((resolve, reject) => {
        axios({
            method  : 'put',
            url     : `${rootPath}/${path}`,
            data    : formData,
            params  : params,
            headers : configHeaders,
        }).then(
            res => {
                resolve(res.data);
            }
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });

    return promise;
};

export const Delete = (path, formData, params) => {
    const promise = new Promise((resolve, reject) => {
        axios({
            method      : 'delete',
            url         : `${rootPath}/${path}`,
            data        : formData,
            params      : params,
            headers     : configHeaders
        }).then(
            res => {
                resolve(res.data);
            }
        ).catch(
            err => {
                if(err.response){
                    reject(err.response);
                }else if(err.request) {
                    reject(err.request);
                }else{
                    reject(err);
                }
            }
        );
    });

    return promise;
};





