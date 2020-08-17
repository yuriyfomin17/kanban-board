import React, {useEffect, useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext} from "react-beautiful-dnd";
import ModalWindow from "./ModalWindow";
import axios from "axios"

const initialTasks = [
    {
        0: [{
            id: uuidv4(),
            title: "a",
            priority: 1,
            status: 'review',
            time: new Date()
        }, {
            id: uuidv4(),
            title: "b",
            priority: 2,
            status: 'review',
            time: new Date()
        }, {
            id: uuidv4(),
            title: "c",
            priority: 3,
            status: 'review',
            time: new Date()
        },]
    },
    {
        1: []
    },
    {
        2: []
    },
    {
        3: [
            {
                id: uuidv4(),
                title: "d",
                priority: 3,
                status: 'review',
                time: new Date()
            },
        ]
    }

]

const statuses = ['todo', 'progress', 'review', 'done']

function App() {




    const [tasks, setTasks] = useState(initialTasks)
    const deleteTask = (column, ID) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        const indexToDelete = arrColumnTasks.findIndex(el => el.id === ID)
        arrColumnTasks.splice(indexToDelete, 1)
        setTasks(copiedTasks)
    }
    const editTask = (column, ID, title) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        const indexToEdit = arrColumnTasks.findIndex(el => el.id === ID)
        arrColumnTasks[indexToEdit].title = title
        setTasks(copiedTasks)
    }
    const addTask = (column, title) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        arrColumnTasks.push({id: uuidv4(), title: title, priority: arrColumnTasks.length + 1, time: new Date()})
        setTasks(copiedTasks)
        console.log(copiedTasks)
    }
    const sortDataAlphabetically = (column, typeSort) => {
        const copiedTasks = tasks.slice()
        const arrColumnTasks = copiedTasks[column][column]
        if (typeSort === "Alphabet") {

            arrColumnTasks.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1
                }
                if (a.title < b.title) {
                    return -1
                }

            })
            setTasks(copiedTasks)
        }
        if (typeSort === "TimeNew") {
            console.log(arrColumnTasks)
            arrColumnTasks.sort(function (a, b) {
                if (a.time > b.time) {
                    return -1
                }
                if (a.time < b.time) {
                    return 1
                }

            })
            setTasks(copiedTasks)
        }
        if (typeSort === "TimeOLD") {
            console.log(arrColumnTasks)
            arrColumnTasks.sort(function (a, b) {
                if (a.time > b.time) {
                    return 1
                }
                if (a.time < b.time) {
                    return -1
                }

            })
            setTasks(copiedTasks)
        }


    }
    const onDragEnd = (result) => {
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
            setTasks(copiedTasks)
        } else {
            console.log(source.droppableId)
            console.log(destination.droppableId)
            const copiedTasks = tasks.slice()
            const tasksArr = copiedTasks[source.droppableId][source.droppableId]
            const [removed] = tasksArr.splice(result.source.index, 1)
            console.log(removed)
            console.log(copiedTasks)
            console.log(copiedTasks[destination.droppableId][destination.droppableId])
            copiedTasks[destination.droppableId][destination.droppableId].splice(result.destination.index, 0, removed)
            console.log(copiedTasks)
            setTasks(copiedTasks)

        }


    }
    useEffect(()=>{
        axios.get('http://localhost:5000/todo')
            .then((result)=>{
                const listDataFromServer= result.data
                console.log(listDataFromServer)


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    },[])
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




