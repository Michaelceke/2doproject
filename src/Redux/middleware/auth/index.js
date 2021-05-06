import {
    apiRequest,
    navigateTo,
    POST,
    PUT,
    GET,
    LOGOUT,
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
    FETCH_UPDATE_PASSWORD,
    UPDATE_PASSWORD,
} from "../../actions/index";
import {message} from 'antd';
/*import { toast } from "react-toastify";*/

const login = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === LOGIN.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: "/auth/login",
                key: "login",
                onSuccess: data => {
                    dispatch({ type: LOGIN.SUCCESS, payload: data });
                    dispatch(navigateTo("/todos"));
                },
                ...action.meta
            })
        );
    }
};

const register = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === REGISTER.START) {
        console.log("Entered here");
        dispatch(
            apiRequest({
                method: POST,
                url: "/auth/register",
                key: "register",
                nextRoute: '/',
                successMessage: 'This is a success message',
                onSuccess: REGISTER.SUCCESS,
                ...action.meta
            })
        );
    }
};

const resetPassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === RESET_PASSWORD.START) {
        dispatch(
            apiRequest({
                method: POST,
                url: "/users/reset-password",
                key: "resetPassword",
                nextRoute: "/",
                ...action.meta
            })
        );
    }
};

const updatePassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === UPDATE_PASSWORD.START) {
        const { token } = action.meta;
        dispatch(
            apiRequest({
                method: POST,
                url: `/users/reset/${token}`,
                key: "updatePassword",
                onSuccess: () => {
                    dispatch(navigateTo("/"));
                },
                ...action.meta
            })
        );
    }
};

const fetchUpdatePassword = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_UPDATE_PASSWORD.START) {
        const { token, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `/users/reset/${token}`,
                key: "fetchUpdatePassword",
                ...rest
            })
        );
    }
};

const logOut = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === LOGOUT.START) {
        dispatch(navigateTo("/"));
        message.success("Bye, see you soon");
    }
};



export default [
    login,
    register,
    logOut,
    resetPassword,
    fetchUpdatePassword,
    updatePassword
];
