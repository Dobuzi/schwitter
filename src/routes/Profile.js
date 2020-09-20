import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyPangs = async () => {
        const myPangs = await dbService
            .collection("pangs")
            .where("author", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        return myPangs;
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    useEffect(() => {
        getMyPangs();
    });
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display Name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                />
            </form>
            <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
                Log Out
            </span>
        </div>
    );
};

export default Profile;
