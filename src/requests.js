import axios from "axios"
import jwt_decode from "jwt-decode"

const url = PROCESS.ENV.API_URL
// const url = "http://35.79.223.19:8800"

const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
    async (config) => {
        let currentDate = new Date();

        const lStorage = localStorage.getItem("persist:root")
        const currentUser = lStorage && JSON.parse(JSON.parse(lStorage)?.user).currentUser
        const accToken = currentUser?.accessToken
        const refToken = currentUser?.refreshToken

        const decodedToken = jwt_decode(accToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            try {
                const res = await axios.post(`${url}/refresh`, { token: refToken });
                console.log(res.data)
                console.log("new access token created")
                config.headers["authorization"] = "Bearer " + res.data.accessToken;
                // config.data["data"] = res.data.refreshToken
                console.log(config)
            } catch (err) {
                console.log(err);
            }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



export const requestwithTokens = async(type, endpoint, body, token, formData) => {
    const res = await axiosJWT({
        method: type,
        url: `${url}${endpoint}`,
        data: body,
        headers: formData ? {'authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'} :
                    {'authorization': `Bearer ${token}`}
    })

    return res
}



export const requestWithoutTokens = async(type, endpoint, body) => { 
    try {
        const res = await axios({
            method: type,
            url: `${url}${endpoint}`,
            data: body,

        })
        return res.data
    } catch(err) {
        //console.log(err)
        return err
    }

}
