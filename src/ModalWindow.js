import React, {useState} from 'react';
import {Modal, ModalHeader, Input, Label, ModalBody, ModalFooter, Button} from "reactstrap"


function ModalWindow(props) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    return (
        <>
            <Button onClick={()=>setModalOpen(!isModalOpen)}> Add new task</Button>
            <Modal isOpen={isModalOpen}>
                <ModalHeader>New task form</ModalHeader>
                <ModalBody>
                    <Label>New Title</Label>
                    <Input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button>Add new Task</Button>{' '}
                    <Button onClick={()=>setModalOpen(!isModalOpen)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalWindow;

