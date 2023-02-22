import {useState} from "react";

import './Modal.scss';

const Modal = ({isOpen}) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    if (!isModalOpen) {
        return
    }

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={'modal-overlay'}>
                <div className={'modal-content'}>
                    123
                    <button onClick={handleClose}>x</button>
                </div>
            </div>
        </>
    );
};

export {Modal};