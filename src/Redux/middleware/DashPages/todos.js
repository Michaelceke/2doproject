import {message} from "antd"
import {API} from "../../../_shared/utils/_urls"
import {
    apiRequest,
    navigateTo,
    GET,
    POST,
    DELETE,
    PUT,
    FETCH_TODOS,
    CREATE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    FETCH_TODO,
    DELETE_TASK,
    CREATE_TASK,
    EDIT_TASK,
    TODO_STATUS_UPDATE
} from "../../actions/index";


const fetchTodos=({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_TODOS.START) {
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.TODOS}`,
                key: 'fetchTodos',
                onSuccess: FETCH_TODOS.SUCCESS,
                ...action,
            })
        );
    }
};

const createTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_TODO.START) {
        const {onSuccess, ...rest} = action.meta;
        console.log('middleware:::::', action.meta);
        dispatch(
            apiRequest({
                method: POST,
                url: `/todos`,
                key: "createTodo",
                onSuccess: (data)=> {
                    dispatch({type:CREATE_TODO.SUCCESS, payload: data});
                    onSuccess()
                },
                ...rest
            })
        );
    }
};

const deleteTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_TODO.START) {

        const { id } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `/todos/${id}`,
                key: "deleteTodo",
                onSuccess: DELETE_TODO.SUCCESS,
                ...action
            })
        );
    }
};
const editTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === EDIT_TODO.START) {
        const { id,onSuccess,...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `/todos/${id}`,
                key: "editTodo",
                onSuccess: (data)=> {
                    dispatch({type:EDIT_TODO.SUCCESS, payload: data});
                    onSuccess()
                },
                ...rest
            })
        );
    }
};

const fetchTodo = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_TODO.START) {
        dispatch(
            apiRequest({
                method: GET,
                url: `/todos/${action.payload}`,
                key: "fetchTodo",
                onSuccess: data => {
                    dispatch({ type: FETCH_TODO.SUCCESS, payload: data });
                    console.log("data::::=>",data)
                    /*dispatch(navigateTo(`/dashboard/${data._id}`));*/
                },
            })
        );
    }
};

const deleteTask = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === DELETE_TASK.START) {
        const { todoId, taskId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: DELETE,
                url: `/todos/${todoId}/tasks/${taskId}`,
                key: "deleteTask",
                onSuccess: DELETE_TASK.SUCCESS,
                ...rest
            })
        );
    }
};
const createTask = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === CREATE_TASK.START) {
        const { todoId,onSuccess, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: POST,
                url: `/todos/${todoId}/tasks`,
                key: "createTask",
                onSuccess: (data)=> {
                    dispatch({type:CREATE_TASK.SUCCESS, payload: data});
                    onSuccess()
                },
                ...rest
            })
        );
    }
};

const editTask = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === EDIT_TASK.START) {
        const { todoId, taskId,onSuccess, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: PUT,
                url: `/todos/${todoId}/tasks/${taskId}`,
                key: "editTask",
                onSuccess: (data)=> {
                    dispatch({type:EDIT_TASK.SUCCESS, payload: data});
                    onSuccess()
                },
                ...rest
            })
        );
    }
};

const todoStatusUpdate = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === TODO_STATUS_UPDATE.START) {
        const { todoId, status } = action.meta;

        dispatch(
            apiRequest({
                method: PUT,
                url: `/todos/${todoId}/${status}`,
                key: "todoStatusUpdate",
                onSuccess: TODO_STATUS_UPDATE.SUCCESS,
                ...action.meta
            })
        );
    }
};



export default [
    fetchTodos,
    createTodo,
    deleteTodo,
    editTodo,
    fetchTodo,
    deleteTask,
    createTask,
    editTask,
    todoStatusUpdate
]