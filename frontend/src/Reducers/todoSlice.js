import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        value: [
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            console.log(action.payload);
            state.value.push(action.payload);
            fetch ('http://localhost:3001/tasks/addTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '123456',
                },
                body: JSON.stringify(action.payload)
            }).catch(error => console.log(error));
        },
        initAddTodo: (state, action) => {
            console.log(action.payload);
            state.value.push(action.payload);
        },
        removeTodo: (state, action) => {
            console.log(action.payload);
            state.value = state.value.filter((todo) => todo.name !== action.payload.name);
            fetch ('http://localhost:3001/tasks/deleteTask/' + action.payload.key, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '123456',
                },
            }).catch(error => console.log(error));
        }
    }
});

export const { addTodo, initAddTodo, removeTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todos.value;

export default todoSlice.reducer;