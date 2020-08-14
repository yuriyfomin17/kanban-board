import React, {useState} from 'react';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import './AddCard.css'
import {Modal, ModalHeader, ModalBody,ModalFooter,Button} from "reactstrap"

const addIcon = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
    <path fill-rule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>)
const saveBut = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-check" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" textAlign="right">
    <path fillRule="evenodd"
          d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    <path fillRule="evenodd"
          d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>
</svg>)



function Board(props) {
    const [addCardBut, setBut] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [sortMenuBar, setMenuBar] = useState(false)
    const toggleMenu = () => {
        setMenuBar(!sortMenuBar)
    }
    const changeAddCard = () => {
        if (addCardBut === false) {
            setBut(!addCardBut)
        }

        if (addCardBut === true && inputValue !== '') {
            setBut(!addCardBut)
            props.addTask(props.indexStatus, inputValue)
            setInputValue('')
        }

    }
    const setInput = (e) => {
        setInputValue(e.target.value)

    }
    const sortDataTimeOld = () => {
        props.sortDataAlphabetically(props.indexStatus, "TimeOLD")
    }
    const sortDataTimeNew = () => {
        props.sortDataAlphabetically(props.indexStatus, "TimeNew")
    }
    const sortAlphabet = () => {
        props.sortDataAlphabetically(props.indexStatus, "Alphabet")
    }

    return (
        <div style={{
            display: 'flex', flexDirection: "column", alignItems: "center"
        }}>

            <div style={{margin: 8}}>
                <h2
                    style={{
                        background: 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 1,
                        borderRadius: 10,
                        textAlign: "center"


                    }}
                >Board {props.status}</h2>


                <Droppable key={uuidv4()} droppableId={String(props.indexStatus)}>
                    {(provided, snapshot) => (

                        <div className='cardsContainer'
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                             style={{
                                 background: snapshot.isDraggingOver ? 'lightgrey' : 'lightblue',
                                 padding: 4,
                                 width: 250,
                                 minHeight: 500,


                             }}
                        >


                            {
                                props.tasks.map((el, index) => <Task
                                    key={el.id}
                                    el={el}
                                    index={index}
                                    deleteTask={props.deleteTask}
                                    editTask={props.editTask}
                                    indexStatus={props.indexStatus}

                                />)
                            }

                            {provided.placeholder}

                        </div>
                    )}


                </Droppable>


                {addCardBut ? <input type="text" className="form-control" aria-label="Small"
                                     aria-describedby="inputGroup-sizing-sm" value={inputValue}
                                     onChange={setInput}/> : ''}
                {addCardBut ? <button type="button" className="btn btn-outline-primary btn-sm "
                                      onClick={changeAddCard}>{saveBut}</button> :
                    <span className="dropdown">
                        <button type="button" className="btn btn-outline-primary btn-sm "
                                onClick={changeAddCard}>{addIcon}</button>
                    </span>
                }

                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={toggleMenu}>Sort
                        by..</button>
                {sortMenuBar?<div><button type="button" className="btn btn-outline-primary btn-sm"
                                  onClick={sortAlphabet}>Alphabet</button>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={sortDataTimeNew}>first new</button>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={sortDataTimeOld}>first old</button></div>:''}
                <Modal isOpen={true} >
                    <ModalHeader >Add New Task</ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button >Do Something</Button>
                        {' '}
                        <Button >Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>

        </div>

    );
}

export default Board;




