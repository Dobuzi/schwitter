import React, { useState } from "react";
import { dbService } from "../fbase";

const Pang = ({ pangObj, isAuthor }) => {
    const [editing, setEditing] = useState(false);
    const [newPang, setNewPang] = useState(pangObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this pang?");
        if (ok) {
            await dbService.doc(`pangs/${pangObj.id}`).delete();
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
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your pang"
                            value={newPang}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{pangObj.text}</h4>
                    {isAuthor && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Pang;
