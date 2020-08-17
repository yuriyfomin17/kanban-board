import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import EditTitle from "./EditTitle";
import "./App.css"

const editBut = (
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z"/>
        <path fillRule="evenodd"
              d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z"/>
        <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z"/>
    </svg>

)
const deleteBut =(
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
    </svg>
)


function Task(props) {

    const deleteItem = () => {
        props.deleteTask(props.indexStatus, props.el._id)
    }

    return (
        <div>

            <Draggable key={uuidv4()} draggableId={props.el._id} index={props.index}>
                {(provided, snapshot) => (
                    <div  key={props.el._id}
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         style={{
                             userSelect: "none",
                             borderRadius: 10,
                             padding: 16,
                             margin: "0 0 8px 0",
                             minHeight: "5px",
                             backgroundColor: snapshot.isDragging
                                 ? "#d5e0d8"
                                 : "#a7c9e3",
                             color: "white",
                             ...provided.draggableProps.style
                         }}
                    >

                        <EditTitle el={props.el} editTask={props.editTask} indexStatus={props.indexStatus} editBut={editBut}/>

                        <div className="dividerBut"/>
                        <button type="button" className="btn btn-outline-primary btn-sm " onClick={deleteItem}>{deleteBut}</button>
                        {provided.placeholder}
                    </div>

                )}


            </Draggable>


        </div>
    );
}

export default Task;





