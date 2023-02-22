import {useState} from "react";
import {RiAddFill} from 'react-icons/ri';

import './Header.scss';

import {Modal} from "../Modal/Modal";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const isOpenModal = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    return (
        <>
            <header className="header">
                <nav className="header__nav">
                    <ul className="header__list">
                        <li>
                            <button className="header__btn">lorem 1</button>
                        </li>
                        <li>
                            <button className="header__btn">lorem 2</button>
                        </li>
                        <li>
                            <button className="header__btn">lorem 3</button>
                        </li>
                        <li>
                            <button className="header__btn">lorem 4</button>
                        </li>
                    </ul>
                    <ul className="header__icons header__icons-plus">
                        <li onClick={isOpenModal}>
                            <button className="header__icon">
                                <RiAddFill size={35} color="#bcbcbc"/>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            {isOpen && <Modal isOpen={isOpen}/>}
        </>
    );
};

export {Header};