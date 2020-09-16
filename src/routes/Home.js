import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Home = () => {
    const [schweet, setSchweet] = useState("");
    const [schweets, setSchweets] = useState([]);
    const getSchweets = async () => {
        const dbSchweets = await dbService.collection("schweets").get();
        dbSchweets.forEach((document) => {
            const schweetObject = {
                ...document.data(),
                id: document.id,
            };
            setSchweets((prev) => [schweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getSchweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("schweets").add({
            schweet,
            createdAt: Date.now(),
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
                        <h4>{schweet.schweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
