import React, { useState } from "react";
import { storageService, dbService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPlus } from "@fortawesome/free-solid-svg-icons";

import "../style/factory.css";

const PangFactory = ({ userObj }) => {
    const [pang, setPang] = useState("");
    const [attachment, setAttachment] = useState("");
    const t_limit = 8000;
    const onSubmit = async (event) => {
        event.preventDefault();
        if (pang === "") {
            return;
        }
        let attachmentURL = "";
        let attachmentLocation = "";
        if (attachment) {
            attachmentLocation = `${userObj.uid}/${uuidv4()}`;
            const attachmentRef = storageService
                .ref()
                .child(attachmentLocation);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentURL = await response.ref.getDownloadURL();
        }
        const pangObj = {
            text: pang,
            expiredAt: Date.now() + t_limit,
            author: userObj.uid,
            attachmentURL,
            attachmentLocation,
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
                            <span>Clear</span>
                            <FontAwesomeIcon icon={faEraser} />
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};

export default PangFactory;
