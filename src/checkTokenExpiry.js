import jwt_decode from "jwt-decode";

const checkTokenExpiry = async () => {

    let currentDate = new Date();
    const decodedToken = jwt_decode(localStorage.getItem("accessToken"));

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken(localStorage.getItem("refreshToken"));
        console.log(data)
        return true
    } else {
        return false
    }

  }

  export default checkTokenExpiry