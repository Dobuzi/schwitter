import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

import Pang from "../components/Pang";

const Home = ({ userObj }) => {
    const [pang, setPang] = useState("");
    const [pangs, setPangs] = useState([]);
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
        await dbService.collection("pangs").add({
            text: pang,
            createdAt: Date.now(),
            author: userObj.uid,
        });
        setPang("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setPang(value);
    };
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
                <input type="submit" value="Pang" />
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
