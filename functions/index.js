const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const storage = admin.storage();

exports.deletePang = functions.firestore
    .document("pangs/{docId}")
    .onCreate((change, context) => {
        const db = admin.firestore();
        let newbatch = db.batch();

        return db
            .collection("pangs")
            .where("expiredAt", "<=", Date.now())
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    newbatch.delete(doc.ref);
                });
                return newbatch.commit();
            })
            .catch((err) => {
                console.error("error occurred", err);
            });
    });

exports.deleteImage = functions.firestore
    .document("pangs/{docId}")
    .onDelete((snap, _context) => {
        const attachmentLocation = snap.data().attachmentLocation;
        if (attachmentLocation !== "") {
            const bucket = storage.bucket();
            const file = bucket.file(attachmentLocation);
            return file
                .delete()
                .then()
                .catch((err) => {
                    console.error("error occurred", err);
                });
        }
        return null
    });
