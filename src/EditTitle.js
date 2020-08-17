import React, {useState} from 'react';
import "./App.css"

const saveBut = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-check" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" textAlign="right">
    <path fillRule="evenodd"
          d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    <path fillRule="evenodd"
          d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>
</svg>)


function EditTitle(props) {
    const [inputValue, setInput] = useState(props.el.title)
    const [editBut, setEditBut] = useState(true)
    const changeEdit = () => {
        setEditBut(!editBut)
    }
    const changeSave = () => {
        props.editTask(props.indexStatus, props.el._id, inputValue)
        setEditBut(!editBut)
    }

    return (
        <span>

                {editBut ? <span className="dividerTitleBut">{props.el.title}</span>  :
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                           value={inputValue} onChange={e => setInput(e.target.value)}/>}
            {editBut ? <button type="button" className="btn btn-outline-primary btn-sm "
                               onClick={changeEdit}>{props.editBut}</button> :
                <button type="button" className="btn btn-outline-primary btn-sm "
                        onClick={changeSave}>{saveBut}</button>}


        </span>
    );
}

export default EditTitle;




