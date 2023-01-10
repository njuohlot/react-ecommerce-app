import axios from "axios";
//creating a base url
const instance = axios.create({
  baseURL: "http://192.168.43.181:3002",
});

export default instance;