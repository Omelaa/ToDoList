import {useEffect, useState} from "react";

import './App.scss';
import {Header} from "./components/Header/Header";

function App() {
    const [boards, setBoards] = useState([]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const [inputValue, setInputValue] = useState("");

    const isOpenElement = (board) => {
        setBoards(prevState => prevState.map(b => {
            if (b.id === board.id) {
                return {...b, isAddForm: !b.isAddForm};
            }
            return b;
        }));
        setInputValue('');
    };

    function saveDataToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };

    function loadDataFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    };

    useEffect(() => {
        // saveDataToStorage('boards', []);
        const boardsData = loadDataFromStorage('boards');
        setBoards(boardsData);
    }, []);

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === 'todo__item') {
        }
    };

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    };

    function dragLeaveHandler(e) {
    };

    function dragEndHandler(e, item) {
    };

    function dropHandler(e, board, item) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        if (board.items.indexOf(currentItem) === -1) {
            board.items.splice(dropIndex + 1, 0, currentItem);
        }
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }));

        saveDataToStorage('boards', boards);
    };

    function dropCardHandler(e, board) {
        if (board.items.indexOf(currentItem) === -1) {
            board.items.push(currentItem);
            const currentIndex = currentBoard.items.indexOf(currentItem);
            currentBoard.items.splice(currentIndex, 1);
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            }));

            saveDataToStorage('boards', boards);
        }
    };


    function handleTitleChange(e, item) {
        item.title = e.target.innerText;
        setBoards([...boards]);
        saveDataToStorage('boards', boards);
    };

    const addBoard = (e, board, id) => {
        e.preventDefault();
        board.items.push({id: Date.now(), title: inputValue});
        setBoards([...boards]);
        saveDataToStorage('boards', boards);
        setInputValue('');
    };

    const addMainBoard = () => {
        setBoards([...boards, {id: Date.now(), title: 'Text', items: []}]);
        saveDataToStorage('boards', boards);
        console.log(boards)
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="App">
            <div className={'container'}>
                <Header addMainBoard={addMainBoard}/>
                <div className={'todo'}>
                    <ul className={'todo__list'}>
                        {
                            boards && boards.map((board) =>
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
                                            </li>
                                        )}
                                        {
                                            <li>
                                                {board.isAddForm &&
                                                    <form className={"todo__form"} onSubmit={(e) => addBoard(e, board)}>
                                                        <textarea className={"todo__textarea"}
                                                                  placeholder={'Enter some text...'} value={inputValue}
                                                                  onChange={handleInputChange}/>
                                                        <label className={"todo__btns"}>
                                                            <button className={"todo__btn todo__btn-add"}
                                                                    type={'submit'}>Add
                                                            </button>
                                                            <button className={"todo__btn todo__btn-cancel"} type={'button'}
                                                                    onClick={() => isOpenElement(board)}>Delete
                                                            </button>
                                                        </label>
                                                    </form>
                                                }
                                                {!board.isAddForm &&
                                                    <button onClick={() => isOpenElement(board)}>add card</button>}
                                            </li>
                                        }
                                    </ul>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
