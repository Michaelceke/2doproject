import React, {lazy,Suspense} from "react"
import "./App.css"
import { Switch, Route } from 'react-router-dom';
import CustomRoute from "./components/CustomRoute";
const Loading = () => (
    <div>Loading...</div>
);

const Login=lazy(() =>import("./components/login/Login"));
const Register=lazy(()=>import("./components/Register/Register"));
const Dashboard=lazy(()=>import("./components/dashboard/DashBoard"));

function App(){
  return(
      <div className="app">
          <Suspense fallback={Loading}>
              <Switch>
                  <Route exact path="/" name="login" component={Login} />
                  <Route exact path="/register" name="register" component={Register} />
                  <CustomRoute  path="/:app" name="dashboard" component={Dashboard} />
                  {/*<DashBoard/>*/}
                  {/*<Login/>*/}
                  {/*<Loto/>*/}
              </Switch>
          </Suspense>
      </div>
  )
}


export default App