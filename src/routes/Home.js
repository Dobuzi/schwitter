import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

import Pang from "../components/Pang";
import PangFactory from "../components/PangFactory";

const Home = ({ userObj }) => {
    const [pangs, setPangs] = useState([]);
    useEffect(() => {
        dbService
            .collection("pangs")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const pangArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPangs(pangArray.sort((a, b) => a.createdAt < b.createdAt));
            });
    }, []);

    return (
        <div className="container">
            <PangFactory userObj={userObj} />
            <div className="home__pangs">
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
