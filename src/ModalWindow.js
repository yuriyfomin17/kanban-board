import React, {useState} from 'react';
import {Modal, ModalHeader, Input, Label, ModalBody, ModalFooter, Button} from "reactstrap"


function ModalWindow(props) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [boardOption, setBoard] = useState(0)
    console.log(boardOption)
    const addNewTask = () => {
        props.addTask(boardOption, newTitle)
        setModalOpen(!isModalOpen)
        setNewTitle("")
    }
    return (
        <>
            <Button onClick={() => setModalOpen(!isModalOpen)}> Add new task</Button>
            <Modal isOpen={isModalOpen}>
                <ModalHeader>New task form</ModalHeader>
                <ModalBody>
                    <Label>New Title</Label>
                    <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                           placeholder="Enter Task Title..."/>
                </ModalBody>
                <select id="priority" className="form-control" value={boardOption}
                        onChange={(e) => setBoard(e.target.value)} placeholder="">
                    {
                        props.statuses.map((el, index) => {
                            return <option key={el} value={index}>{el}</option>;
                        })
                    }
                </select>
                <ModalFooter>
                    <Button onClick={addNewTask}>Add new Task</Button>{' '}
                    <Button onClick={() => setModalOpen(!isModalOpen)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalWindow;

