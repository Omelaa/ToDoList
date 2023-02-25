import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {loadDataFromStorage} from "../../service/storage/localStorage";
import {ToDoItem} from "../ToDoItem/ToDoItem";
import {todoActions} from "../../redux/slices/todo.slice";

const ToDoItems = () => {
    const dispatch = useDispatch();
    const {boards} = useSelector(state => state.todo);

    useEffect(() => {
        // saveDataToStorage('boards', []);
        const boardsData = loadDataFromStorage('boards');
        dispatch(todoActions.setBoards(boardsData));
    }, []);

    return (
        <>
            <div className={'todo'}>
                <ul className={'todo__list'}>
                    {
                        boards && boards.map((board) => <ToDoItem key={board.key} boards={boards} board={board}/>)
                    }
                </ul>
            </div>
        </>
    );
};

export {ToDoItems};