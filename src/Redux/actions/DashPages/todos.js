import {createActionString,createActionType} from "../../../_shared/utils";

const entity= "TODOS";

export const FETCH_TODOS = createActionType("FETCH_TODOS", entity);
export const DELETE_TODO = createActionType("DELETE_TODO", entity);
export const CREATE_TODO = createActionType("CREATE_TODO", entity);
export const EDIT_TODO = createActionType("EDIT_TODO", entity);
export const FETCH_TODO = createActionType("FETCH_TODO", entity);
export const DELETE_TASK = createActionType("DELETE_TASK", entity);
export const CREATE_TASK = createActionType("CREATE_TASK", entity);
export const EDIT_TASK = createActionType("EDIT_TASK", entity);
export const TODO_STATUS_UPDATE = createActionType("TODO_STATUS_UPDATE", entity);

export const fetchTodos= ()=> ({
   type: FETCH_TODOS.START
});

export const deleteTodo= (id)=> ({
   type: DELETE_TODO.START,
   meta:{id}
});

export const createTodo = (payload, onSuccess) => ({
   type: CREATE_TODO.START,
   meta: {
      payload,
      ...onSuccess
   }
});

export const editTodo = (id, payload, onSuccess) => ({
   type: EDIT_TODO.START,
   meta: {
      id,
      payload,
      ...onSuccess
   }
});

export const fetchTodo = id => ({
   type: FETCH_TODO.START,
   payload:id
});

export const deleteTask = (todoId, taskId) => ({
   type: DELETE_TASK.START,
   meta: { todoId, taskId }
});

export const createTask=(payload,todoId,onSuccess)=>({
  type: CREATE_TASK.START,
  meta:{payload,
     todoId,
     ...onSuccess
  },

});

export const editTask = (payload, todoId, taskId,onSuccess) => ({
   type: EDIT_TASK.START,
   meta: {
      payload,
      todoId,
      taskId,
     ...onSuccess
   }
});

export const todoStatusUpdate = (status, todoId) => ({
   type: TODO_STATUS_UPDATE.START,
   meta: {
      status,
      todoId
   }
});
