import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap"


function ModalWindow() {
    return (
        <Modal isOpen={true}>
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
                <Button>Do Something</Button>{' '}
                <Button>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalWindow;

