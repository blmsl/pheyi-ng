'use strict';

process.env.DEBUG = 'actions-on-google:*';

const App = require('actions-on-google').ApiAiApp;
let functions = require('firebase-functions');
let admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//push notifications
exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onWrite(event=>{
    const message = event.data.val();
    const userId = event.params.userId;

    const payload = {
        notification : {
            title : message.title,
            body : message.body,
            icon : "https://placeimg.com/250/250/people"
        }
    };

    admin.database()
        .ref(`/fcmTokens/${userId}`)
        .once('value')
        .then(token => token.val())
        .then(userFcmToken => {
            return admin.messaging().sendToDevice(userFcmToken, payload);
        })
        .then(res=>{
            console.log("sent successfully", res);
        })
        .catch(err => {
            console.log(err);
        })
})


//when successful order is made update quantity in stock
exports.onOrder = functions.database.ref('/orders/{pushId}').onWrite(event => {

    // if (event.data.val().isPayed && !event.data.val().isSold) {

    //     let root = event.data.adminRef.root        
    //     let orderItems = event.data.val();
        
    //     for(var i=0; i<orderItems.items.length; i++){

    //         let itemQtyInStore = 0, itemQty = 0;

    //         let itemKey = orderItems.items[i].itemKey;
    //         itemQty = orderItems.items[i].quantity;

    //         let itemRef = root.child('items').child(itemKey.toString());
    //         itemRef.once('value', function(snapshot){
    //              let itemInStore = snapshot.val();
    //              itemQtyInStore = itemInStore.quantityInStock;
    //              let itemQtyLeft = itemQtyInStore - itemQty;

    //              if(itemQtyLeft === 0){
    //                  return itemRef.update({quantityInStock : itemQtyLeft, isSoldOut : true});                
    //              }
    //              return itemRef.update({quantityInStock : itemQtyLeft});
    //         })
    //     }
     
    //    return event.data.ref.update({isSold : true});
        
    // } else {
    //     return;
    // }

})

//when the quantity of an item changes update isSoldOut state
exports.onStoreItemChange = functions.database.ref('/items/{pushId}').onWrite(event=>{
    if(event.data.val().quantityInStock > 0){
        return event.data.ref.update({isSoldOut : false});
    }
    if(event.data.val().quantityInStock === 0){
         return event.data.ref.update({isSoldOut : true});
    }
    if(event.data.val().quantityInStock < 0){
        return event.data.ref.update({isSoldOut : true, quantityInStock : 0});
    }

})

//when a new item is added to store
exports.onNewItem = functions.database.ref('/items/{pushId}').onWrite(event => {
    console.write('A new item has been added');

    //TODO: Notify every body of all the item that has been added to store via Email and SMS
})
