import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Pang = ({ pangObj, isAuthor }) => {
    const [editing, setEditing] = useState(false);
    const [newPang, setNewPang] = useState(pangObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this pang?");
        if (ok) {
            await dbService.doc(`pangs/${pangObj.id}`).delete();
            await storageService.refFromURL(pangObj.attachmentURL).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`pangs/${pangObj.id}`).update({
            text: newPang,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewPang(value);
    };
    return (
        <div
            style={isAuthor ? { backgroundColor: "#55efc4" } : {}}
            className="pang"
        >
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container pangEdit">
                        <input
                            type="text"
                            placeholder="Edit your pang"
                            value={newPang}
                            required
                            autoFocus
                            onChange={onChange}
                            className="formInput"
                        />
                        <input
                            type="submit"
                            value="Update"
                            className="formBtn"
                        />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
            ) : (
                <>
                    <h4 style={isAuthor ? { color: "#636e72" } : {}}>
                        {pangObj.text}
                    </h4>
                    {pangObj.attachmentURL && (
                        <img src={pangObj.attachmentURL} alt="pang img" />
                    )}
                    {isAuthor && (
                        <div className="pang__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Pang;
