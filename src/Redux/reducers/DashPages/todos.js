import {
  FETCH_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  FETCH_TODO,
  DELETE_TASK,
  CREATE_TASK,
  EDIT_TASK,
    TODO_STATUS_UPDATE
} from "../../actions/DashPages/todos";

const initialState = {
  current: null,
  byList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TODOS.SUCCESS:
      return {
        ...state,
        byList: payload,
      };
    case CREATE_TODO.SUCCESS:
      return {
        ...state,
        current: payload,
        byList: [payload, ...state.byList],
      };
    case DELETE_TODO.SUCCESS:
      return {
        ...state,
        byList: state.byList.filter((todo) => todo._id !== payload?.id),
      };
    case EDIT_TODO.SUCCESS:
      console.log("payloado", payload);
      return {
        ...state,
        byList: state.byList.map((todo, ind) => {
          if (todo._id === payload._id) {
            return payload;
          } else return todo;
        }),
      };
    case DELETE_TASK.SUCCESS:
      console.log("payloado delete", payload);
      return {
        ...state,
        current: {
          ...state.current,
          tasks: state.current.tasks.filter((task) => task._id !== payload?.id),
        },
      };
    case CREATE_TASK.SUCCESS:
      console.log("payload task create", payload);
      return {
        ...state,
        current: {
          ...state.current,
          tasks: [payload, ...state.current.tasks],
        },
      };
    case FETCH_TODO.SUCCESS:
      return {
        ...state,
        current: payload,
      };
    case EDIT_TASK.SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          tasks: state.current.tasks.map((task, ind) => {
            if (task?._id === payload?._id) {
              return payload;
            } else return task;
          }),
        },
      };
    case TODO_STATUS_UPDATE.SUCCESS:
      console.log("payloado status update", payload);
      return {
        ...state,
        current: payload
      };

    default:
      return state;
  }
};
