import {useState} from "react";
import {RiAddFill} from 'react-icons/ri';

import './Header.scss';


const Header = ({addMainBoard}) => {

    return (
        <>
            <header className="header">
                <nav className="header__nav">
                    <ul className="header__list">
                        <li>
                            <button className="header__btn">Button</button>
                        </li>
                    </ul>
                    <ul className="header__icons header__icons-plus">
                        <li onClick={addMainBoard}>
                            <button className="header__icon">
                                <RiAddFill size={35} color="#bcbcbc"/>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            {/*{isOpen && <Modal isOpen={isOpen}/>}*/}
        </>
    );
};

export {Header};