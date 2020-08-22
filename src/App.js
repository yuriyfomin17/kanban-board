import React, {useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext} from "react-beautiful-dnd";
import ModalWindow from "./ModalWindow";

const initialTasks = [
    {
        0: []
    },
    {
        1: []
    },
    {
        2: []
    },
    {
        3: []
    }

]

const statuses = ['todo', 'progress', 'review', 'done']

function App() {
    const [tasks, setTasks] = useState(initialTasks)
    const deleteTask = async (column, ID) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        const indexToDelete = arrColumnTasks.findIndex(el => el._id === ID)
        arrColumnTasks.splice(indexToDelete, 1)

    }
    const editTask = async (column, ID, title) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        const indexToEdit = arrColumnTasks.findIndex(el => el._id === ID)
        arrColumnTasks[indexToEdit].title = title
        setTasks(copiedTasks)


    }
    const addTask = async (column, title) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        arrColumnTasks.push({_id: uuidv4(), title: title, priority: arrColumnTasks.length + 1, time: new Date()})
        setTasks(copiedTasks)
        console.log(copiedTasks)

    }
    const sortDataAlphabetically = async (column, typeSort) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        if (typeSort === "Alphabet") {

            // eslint-disable-next-line array-callback-return
            arrColumnTasks.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1
                }
                if (a.name < b.name) {
                    return -1
                }

            })

        }
        if (typeSort === "TimeNew") {
            console.log(arrColumnTasks)
            // eslint-disable-next-line array-callback-return
            arrColumnTasks.sort(function (a, b) {
                if (a.createdAt > b.createdAt) {
                    return -1
                }
                if (a.createdAt < b.createdAt) {
                    return 1
                }

            })

        }
        if (typeSort === "TimeOLD") {
            console.log(arrColumnTasks)
            // eslint-disable-next-line array-callback-return
            arrColumnTasks.sort(function (a, b) {
                if (a.createdAt > b.createdAt) {
                    return 1
                }
                if (a.createdAt < b.createdAt) {
                    return -1
                }

            })
        }


        setTasks(copiedTasks)


    }
    const onDragEnd = async (result) => {
        const {source, destination} = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        if (destination.droppableId === source.droppableId) {
            const copiedTasks = tasks.slice()
            const tasksArr = copiedTasks[destination.droppableId][destination.droppableId]
            const [removed] = tasksArr.splice(result.source.index, 1)
            tasksArr.splice(result.destination.index, 0, removed)
            console.log(copiedTasks)
            // eslint-disable-next-line array-callback-return
            copiedTasks[destination.droppableId][destination.droppableId].map((el, index) => {
                el.index = index
            })

            console.log("copiedTasks", copiedTasks[destination.droppableId][destination.droppableId])


            setTasks(copiedTasks)
        } else {
            const copiedTasks = tasks.slice()
            const tasksArr = copiedTasks[source.droppableId][source.droppableId]
            // eslint-disable-next-line array-callback-return
            console.log("removed Index", result.source.index)
            console.log("des index", result.destination.index)
            const [removed] = tasksArr.splice(result.source.index, 1)
            copiedTasks[destination.droppableId][destination.droppableId].splice(result.destination.index, 0, removed)
            console.log("Copied Tasks", copiedTasks)
            setTasks(copiedTasks)
        }
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div
                        style={{
                            display: 'flex', flexDirection: "row", alignItems: "top"
                        }}

                    >
                        {
                            tasks.map((el, index) => <Board
                                indexStatus={index}
                                key={index}

                                status={statuses[index]}
                                tasks={el[String(index)]}
                                deleteTask={deleteTask}
                                editTask={editTask}
                                addTask={addTask}
                                sortDataAlphabetically={sortDataAlphabetically}
                            />)
                        }
                    </div>


                </DragDropContext>

            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ModalWindow statuses={statuses} addTask={addTask}/>
            </div>
        </div>

    )
        ;
}

export default App;




