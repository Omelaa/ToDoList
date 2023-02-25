import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {saveDataToStorage} from "../../service/storage/localStorage";
import {todoActions} from "../../redux/slices/todo.slice";

const ToDoItem = ({setBoards, board}) => {
    const dispatch = useDispatch();
    const {boards} = useSelector(state => state.todo);

    const [inputValue, setInputValue] = useState("");

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const isOpenElement = (isBoard) => {
        const newBoard = boards.map(b => {
            if (b.id === isBoard.id) {
                return {...b, isAddForm: !b.isAddForm};
            }
            return b;
        });
        dispatch(todoActions.setBoards(newBoard));
        setInputValue('');
    };

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === 'todo__item') {
        }
    };

    function dragStartHandler(e, isBoard, item) {
        setCurrentBoard(isBoard);
        setCurrentItem(item);
    };

    function dragLeaveHandler(e) {
        e.preventDefault();
    };

    function dragEndHandler(e, item) {
        e.preventDefault();
    };

    function dropHandler(e, isBoard, item) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = isBoard.items.indexOf(item);
        if (isBoard.items.indexOf(currentItem) === -1) {
            isBoard.items.splice(dropIndex + 1, 0, currentItem);
        }
        const newBoards = boards.map(b => {
            if (b.id === isBoard.id) {
                return isBoard;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        });

        dispatch(todoActions.setBoards(newBoards));
        saveDataToStorage('boards', boards);
    };

    function dropCardHandler(e, isBoard) {
        if (!isBoard || !isBoard.items) {
            return;
        }
        if (isBoard.items.indexOf(currentItem) === -1) {
            const newItems = [...isBoard.items, currentItem];
            const newBoard = {...isBoard, items: newItems};

            const currentIndex = currentBoard.items.indexOf(currentItem);
            currentBoard.items.splice(currentIndex, 1);

            const updatedBoards = boards.map((b) =>
                b.id === isBoard.id ? newBoard : b
            );
            dispatch(todoActions.setBoards(updatedBoards));
            saveDataToStorage("boards", updatedBoards);
        }
    }

    function handleTitleChange(e, item) {
        const newItem = {...item, title: e.target.innerText};
        const newBoards = boards.map(board => board.id === newItem.id ? newItem : board);
        dispatch(todoActions.setBoards(newBoards));
        saveDataToStorage('boards', newBoards);
    };

    const addBoard = (e, isBoard) => {
        e.preventDefault();
        const newItems = [...isBoard.items, {id: Date.now(), title: inputValue}];
        const newBoard = {...isBoard, items: newItems};
        const newBoards = boards.map(board => (board.id === isBoard.id ? newBoard : board));
        dispatch(todoActions.setBoards(newBoards));
        saveDataToStorage('boards', newBoards);
        setInputValue('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const onDeleteBoard = (id) => {
        const updatedBoards = boards.filter((value) => value.id !== id);
        dispatch(todoActions.setBoards(updatedBoards));
        saveDataToStorage('boards', updatedBoards);
    };

    const onDeleteListItem = (id) => {
        const newBoards = boards.map((value) => {
            const newItems = value.items.filter((item) => item.id !== id);
            return {...value, items: newItems};
        });
        dispatch(todoActions.setBoards(newBoards));
        saveDataToStorage('boards', newBoards);
    };


    return (
        <>
            <li
                key={board.id}
                className={'todo__item'}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, board)}
            >
                <h3
                    className={'todo__title'}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onInput={(e) => handleTitleChange(e, board)}
                >
                    {!!board.title ? board.title : 'Text Change'}
                </h3>
                <button className={'todo__close-btn todo__close-btn-main'} onClick={() => onDeleteBoard(board.id)}>
                    button
                </button>
                <ul className={'todo__second-list'}>
                    {board && board.items.map(value =>
                        <li
                            key={value.id}
                            className={'todo__second-item'}
                            draggable={true}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, board, value)}
                            onDragEnd={(e) => dragEndHandler(e, value)}
                            onDrop={(e) => dropHandler(e, board, value)}
                        >
                                                <span
                                                    className={'todo__second-title'}
                                                    contentEditable={true}
                                                    suppressContentEditableWarning={true}
                                                    onInput={(e) => handleTitleChange(e, value)}>
                                                {value.title}
                                                </span>
                            <button className={'todo__close-btn'}
                                    onClick={() => onDeleteListItem(value.id)}>
                                button
                            </button>
                        </li>
                    )}
                    {
                        <li>
                            {board.isAddForm &&
                                <form className={"todo__form"} onSubmit={(e) => addBoard(e, board)}>
                                    <textarea className={"todo__textarea"}
                                              placeholder={'Enter some text...'}
                                              value={inputValue}
                                              onChange={handleInputChange}
                                    />
                                    <label className={"todo__btns"}>
                                        <button className={"todo__btn todo__btn-add"}
                                                type={'submit'}>Add
                                        </button>
                                        <button className={"todo__btn todo__btn-cancel"}
                                                type={'button'}
                                                onClick={() => isOpenElement(board)}
                                        >
                                            Delete
                                        </button>
                                    </label>
                                </form>
                            }
                            {!board.isAddForm &&
                                <button onClick={() => isOpenElement(board)}>
                                    Add a card
                                </button>
                            }
                        </li>
                    }
                </ul>
            </li>
        </>
    );
};

export {ToDoItem};