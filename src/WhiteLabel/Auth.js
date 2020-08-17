import axios from "axios";

class AuthManager {
    constructor (baseUrl) {
        this.baseUrl = baseUrl;
    }

    isAuthenticated = () => {
        return this.getAuthorization();
    };

    getAuthorization = () => {
        return localStorage.getItem('authorization');
    };

    authenticate = (username, password, cb) => {
        let inputs = {username, password};
        axios.post(`${this.baseUrl}/publisher/login`, inputs)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    localStorage.setItem('authorization', `Bearer ${res.data.data.accessToken}`);
                    cb(true);
                } else {
                    cb(false, res.data.message);
                }
            })
            .catch(error => {
                cb(false, (error.response && error.response.data) ? error.response.data.message : error);
            })
    };

    logout = () => {
        localStorage.removeItem('authorization');
    }
}

let Auth = new AuthManager("/api");
// let Auth = new AuthManager("https://whitelabel.weblancer.ir/api");

export default Auth;
