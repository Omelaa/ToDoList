import {createSlice} from "@reduxjs/toolkit";
import {saveDataToStorage} from "../../service/storage/localStorage";

const initialState = {
    boards: [],
};

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        setBoards(state, action) {
            state.boards = action.payload;
        },
        addBoard: (state) => {
            const newBoard = {id: Date.now(), title: 'Any Title', items: []};
            state.boards.push(newBoard);
            saveDataToStorage('boards', state.boards);
        },
    }
});

const {
    reducer: todoReducer,
    actions: {
        addBoard,
        setBoards
    }
} = todoSlice;

const todoActions = {
    addBoard,
    setBoards
};


export {todoReducer, todoActions};