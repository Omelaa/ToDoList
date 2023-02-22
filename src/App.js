import {useEffect, useState} from "react";

import './App.scss';
import {Header} from "./components/Header/Header";

function App() {
    const [boards, setBoards] = useState([
        {id: 1, title: 'Зробити', items: [{id: 1, title: 'Піти гуляти'}, {id: 2, title: 'Піти в магазин'}]},
        {id: 2, title: 'Доробити', items: [{id: 3, title: 'Піти 1'}, {id: 4, title: 'Піти в 12'}]},
        {id: 3, title: 'Поробити', items: [{id: 5, title: 'Піти 2'}, {id: 6, title: 'Піти в 13'}]},
        {id: 4, title: 'Не робити', items: [{id: 7, title: 'Піти 3'}, {id: 8, title: 'Піти в 14'}]},
    ]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function saveDataToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function loadDataFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    useEffect(() => {
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


    return (
        <div className="App">
            <div className={'container'}>
                <Header/>
                <div className={'todo'}>
                    <div className={'todo__list'}>
                        {
                            boards.map((board) =>
                                <div
                                    key={board.id}
                                    className={'todo__item'}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropCardHandler(e, board)}
                                >
                                    <h3 className={'todo__title'}>
                                        {board.title}
                                    </h3>
                                    <div className={'todo__second-list'}>
                                        {board.items.map(value =>
                                            <div
                                                key={value.id}
                                                className={'todo__second-item'}
                                                draggable={true}
                                                onDragOver={(e) => dragOverHandler(e)}
                                                onDragLeave={(e) => dragLeaveHandler(e)}
                                                onDragStart={(e) => dragStartHandler(e, board, value)}
                                                onDragEnd={(e) => dragEndHandler(e, value)}
                                                onDrop={(e) => dropHandler(e, board, value)}
                                            >
                                                {value.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
