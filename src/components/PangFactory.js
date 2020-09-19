import React, { useState } from "react";
import { storageService, dbService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

const PangFactory = ({ userObj }) => {
    const [pang, setPang] = useState("");
    const [attachment, setAttachment] = useState(null);
    const onSubmit = async (event) => {
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
        setAttachment(null);
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
    const onClearClick = () => setAttachment(null);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={pang}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Pang" />
                {attachment && (
                    <div>
                        <img
                            src={attachment}
                            width="50px"
                            height="50px"
                            alt="profile"
                        />
                        <button onClick={onClearClick}>Clear</button>
                    </div>
                )}
            </form>
        </>
    );
};

export default PangFactory;
