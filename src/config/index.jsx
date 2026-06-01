const {default :axios}= require ("axios");
export const BASE_URL= "https://apna-circle.onrender.com";

const clientServer = axios.create( {
    baseURL: BASE_URL
});
export default clientServer;