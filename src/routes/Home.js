import React, { useState } from "react";

const Home = () => {
    const [schweet, setSchweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
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
        </div>
    );
};

export default Home;
