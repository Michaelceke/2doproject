import React from "react";
import { Redirect, Route } from "react-router-dom";
import authService from "../../service/auth";

const CustomRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = authService.isLoggedIn();
    console.log("isLoggedIn::::::::::", isLoggedIn);

    return (
        <Route
            {...rest}
            render={props => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{ pathname: "/", state: { from: props.location.pathname } }}
                        />
                    );
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default CustomRoute;
