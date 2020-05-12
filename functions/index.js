const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.pushEnglishPostUpdate = functions.database.ref('Articles/RecentEnglishArticles/{Id}').onWrite((change,context) => {
    const post = change.after.val();

    const payload = {
        notification: {
            title: `ReadHub - Magazine`,
            body: `${post.title}`,
            sound: "default"
        }
    }

    return admin.database().ref('fcm-token').once('value').then(allToken => {

        if (allToken.val()) {
            console.log('token available');
            const token = Object.keys(allToken.val());
            return admin.messaging().sendToTopic("ReadHub", payload)
                .then(function (response) {
                    console.log('Notification sent successfully:', response);
                })
                .catch(function (error) {
                    console.log('Notification sent failed:', error);
                });
        } else {
            console.log('token not available');
        }
    })
});

exports.pushSinhalaPostUpdate = functions.database.ref('Articles/RecentSinhalaArticles/{Id}').onWrite((change,context) => {
    const post = change.after.val();

    const payload = {
        notification: {
            title: `ReadHub - සඟරාව`,
            body: `${post.title}`,
            sound: "default"
        }
    }

    return admin.database().ref('fcm-token').once('value').then(allToken => {

        if (allToken.val()) {
            console.log('token available');
            const token = Object.keys(allToken.val());
            return admin.messaging().sendToTopic("ReadHub", payload)
                .then(function (response) {
                    console.log('Notification sent successfully:', response);
                })
                .catch(function (error) {
                    console.log('Notification sent failed:', error);
                });
        } else {
            console.log('token not available');
        }
    })
});
