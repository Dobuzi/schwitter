const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const storage = admin.storage();

exports.deletePang = functions.firestore
    .document("pangs/{docId}")
    .onCreate((snap, context) => {
        const expiredAt = snap.data().expiredAt;
        return setTimeout(() => {
            snap.ref.delete().then(
                console.log(`${context.params.docId} deleted.`)
            ).catch((err) => {
                console.error("error occurred", err);
            })
        }, expiredAt - Date.now());
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
