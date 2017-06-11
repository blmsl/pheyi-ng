'use strict';

process.env.DEBUG = 'actions-on-google:*';

const App = require('actions-on-google').ApiAiApp;
let functions = require('firebase-functions');
let admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


//add subtotal of all shopping cart
exports.onAddToCart = functions.database.ref('shoppingCart/{uid}').onWrite(event => {

})

//when successful order is made
exports.onOrder = functions.database.ref('orders').onWrite(event => {

})

//bot Fulfillment webhook
exports.bot = functions.https.onRequest((request, response) => {

    const app = new App({ request, response });
    let actionMap = new Map();


    //---INTENTS----------//
    actionMap.set('search.collections', selectDress);
    app.handleRequest(actionMap);


    //---FULFILLMENTS-----//

    //select dress
    function selectDress(app) {
        // const _collections = "Collections: "

        // const items = admin.database().ref('/items');

        // items.once('value').then(function (snapshot) {
        //     // snapshot.forEach(function(childSnapShot) {
        //     //     var childKey = childSnapShot.key;
        //     //     var childData = childSnapShot.val();

        //     //    app.tell(childData.description);
        //     // });  
        //     // app.tell(
        //     //     {
        //     //         speech: 'Okay see you later',
        //     //         displayText: 'OK see you later!'                  
        //     //     }
        //     // );

        //     // app.tell(_collections.concat(JSON.stringify(snapshot.val()))) ;  


        // });
        app.tell({

            speech: "Barack Hussein Obama II is the 44th and current President of the United States.",
            displayText: "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
            data : {
                telegram: {
                    text:"Hello this is from telegram"
                }
            },
            // contextOut : [...],
            source : "DuckDuckGo"

        })

    }
})