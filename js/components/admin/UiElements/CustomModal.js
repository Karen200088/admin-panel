import React from 'react';
import Modal from "react-bootstrap/Modal";

const CustomModal = ({headerTitle , children , handleClose , modalShow}) => {

    return (
        <Modal
            show={modalShow}
            onHide={handleClose}
            keyboard="true"
        >
            <Modal.Header closeButton>
                <Modal.Title>{headerTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default CustomModal;
