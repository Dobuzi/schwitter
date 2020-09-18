import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

import Pang from "../components/Pang";

const Home = ({ userObj }) => {
    const [pang, setPang] = useState("");
    const [pangs, setPangs] = useState([]);
    const [attachment, setAttachment] = useState(null);
    useEffect(() => {
        dbService.collection("pangs").onSnapshot((snapshot) => {
            const pangArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPangs(pangArray);
        });
    }, []);
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
    const onClearClick = () => setAttachment(null);
    return (
        <div>
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
            <div>
                {pangs.map((pang) => (
                    <Pang
                        key={pang.id}
                        pangObj={pang}
                        isAuthor={pang.author === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
