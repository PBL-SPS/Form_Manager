import axios from "axios"

const AxiosInst = axios.create({
    baseURL: "https://formsystem.herokuapp.com/",
});

export default AxiosInst;
