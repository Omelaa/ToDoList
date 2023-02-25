
import './App.scss';

import {Header} from "./components/Header/Header";

import {ToDoItems} from "./components/ToDoItems/ToDoItems";

function App() {

    return (
        <div className="App">
            <div className={'container'}>
                <Header/>
                <ToDoItems/>
            </div>
        </div>
    );
}

export default App;
