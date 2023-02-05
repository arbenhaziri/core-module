import axios from "axios";

export default axios.create({
  baseURL: ``,
  withCredentials: false,
  // headers: {
  //   "Content-type": "application/json",
  //   // "Access-Control-Allow-Origin": "*",
  //   // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  // },
});
