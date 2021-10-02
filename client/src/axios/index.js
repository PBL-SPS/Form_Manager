const { default: axios } = require("axios");

const AxiosInst = axios.create({
    baseURL: "localhost:3001/",
});

export default AxiosInst;
