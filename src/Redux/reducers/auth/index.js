import {
    LOGIN,
    LOGOUT,
    UPDATE_SESSION_TOKEN,
} from "../../actions";

const initialState = {
    user: {
        data: undefined,
        session: undefined
    },
    current: null,
    byId: {},
    byList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.SUCCESS:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    data: action.payload
                }
            });
        case UPDATE_SESSION_TOKEN:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    session: action.payload
                }
            });
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
