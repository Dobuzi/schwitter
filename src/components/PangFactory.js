import React, { useState } from "react";
import { storageService, dbService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PangFactory = ({ userObj }) => {
    const [pang, setPang] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        if (pang === "") {
            return;
        }
        event.preventDefault();
        let attachmentURL = "";
        if (attachment) {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentURL = await response.ref.getDownloadURL();
        }
        const pangObj = {
            text: pang,
            createdAt: Date.now(),
            author: userObj.uid,
            attachmentURL,
        };
        await dbService.collection("pangs").add(pangObj);
        setPang("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setPang(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                target: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearClick = () => setAttachment("");
    return (
        <>
            <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                        value={pang}
                        onChange={onChange}
                        type="text"
                        placeholder="What's on your mind?"
                        maxLength={120}
                        className="factoryInput__input"
                    />
                    <input
                        type="submit"
                        value="&rarr;"
                        className="factoryInput__arrow"
                    />
                </div>
                <label htmlFor="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="factoryInput__input__image"
                />
                {attachment && (
                    <div className="factoryForm__attachment">
                        <img
                            src={attachment}
                            alt="profile"
                            style={{ backgroundImage: attachment }}
                        />
                        <button
                            onClick={onClearClick}
                            className="factoryForm__clear"
                        >
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};

export default PangFactory;
