import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
    const [schweet, setSchweet] = useState("");
    const [schweets, setSchweets] = useState([]);
    useEffect(() => {
        dbService.collection("schweets").onSnapshot((snapshot) => {
            const schweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSchweets(schweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("schweets").add({
            text: schweet,
            createdAt: Date.now(),
            author: userObj.uid,
        });
        setSchweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setSchweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={schweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Schweet" />
            </form>
            <div>
                {schweets.map((schweet) => (
                    <div key={schweet.id}>
                        <h4>{schweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
