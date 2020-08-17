import axios from "axios";
import Auth from "./Auth";

class ServerManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getOptions = () => {
        return {
            headers: {
                'Authorization': Auth.getAuthorization()
            }
        }
    };

    setRouter = (router) => {
        this.router = router;
    };

    startPublisherServer = (cb) => {
        axios.put(`${this.baseUrl}/publisher/start`, {}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true);
                } else {
                    cb(false, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.router.redirect('/login');
                } else {
                    cb(false, (error.response && error.response.data) ? error.response.data.message : error);
                }
            })
    };

    stopPublisherServer = () => {

    };
}

let Server = new ServerManager("/api");
// let Server = new ServerManager("https://whitelabel.weblancer.ir/api");

export default Server;
