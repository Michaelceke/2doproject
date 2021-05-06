import { createActionString, createActionType } from "../../../_shared/utils";

export const LOGIN = createActionType("LOGIN", "Auth");
export const REGISTER = createActionType("REGISTER", "Auth");
export const UPDATE_SESSION_TOKEN = createActionString(
    "UPDATE_SESSION_TOKEN",
    "auth"
);
export const RESET_PASSWORD = createActionType("RESET_PASSWORD", "auth");
export const UPDATE_PASSWORD = createActionType("UPDATE_PASSWORD", "auth");
export const FETCH_UPDATE_PASSWORD = createActionType(
    "FETCH_UPDATE_PASSWORD",
    "auth"
);

/*export const LOGOUT = createActionType("LOGOUT", "auth");*/
export const LOGOUT = createActionString("LOGOUT", "auth");

export const login = payload => ({
    type: LOGIN.START,
    meta: { payload }
});

export const register = payload => ({
    type: REGISTER.START,
    meta: { payload }
});

export const updateSessionToken = token => ({
    type: UPDATE_SESSION_TOKEN,
    payload: token
});

export const logout = () => ({
    type: LOGOUT
});
