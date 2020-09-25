import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

import Pang from "../components/Pang";
import PangFactory from "../components/PangFactory";

import "../style/home.css";

const Home = ({ userObj }) => {
    const [pangs, setPangs] = useState([]);
    useEffect(() => {
        dbService
            .collection("pangs")
            .where("expiredAt", ">", Date.now())
            .orderBy("expiredAt", "desc")
            .onSnapshot((snapshot) => {
                const pangArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPangs(pangArray);
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
