import app from "./app";
import api from "./api";
import auth from "./auth";
import todos from "./DashPages/todos";


export default [...app, ...api, ...auth,...todos];