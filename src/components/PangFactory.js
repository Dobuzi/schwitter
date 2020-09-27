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
    const MAX_SIZE = 200;
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
        const compressedSize = `_${MAX_SIZE}x${MAX_SIZE}`;
        const pangObj = {
            text: pang,
            expiredAt: Date.now() + t_limit,
            author: userObj.uid,
            attachmentURL: attachmentURL,
            attachmentLocation: attachmentLocation + compressedSize,
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
    const resizeImage = (result, type) => {
        const img = document.createElement("img");
        img.src = result;
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = MAX_SIZE;
        const MAX_HEIGHT = MAX_SIZE;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL(type)
    }
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        if (theFile) {
            reader.onload = (finishedEvent) => {
                const {
                    target: { result },
                } = finishedEvent;
                setAttachment(resizeImage(result, theFile.type));
            };
        }
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
                        value="&darr;"
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
