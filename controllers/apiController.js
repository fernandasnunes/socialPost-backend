// const moment = require("moment-timezone");

// const mongoConnector = require("../../connectors/mongoConnector");
// const infobipSendController = require("../../controllers/infobip/sendController");
// const assistantController = require("../assistantController");
// const botKeysDictionary = require('../../assets/botKeys.json')
// const assistantCreds = require('../../credentials/assistantCreds.json') 

// async function repassMessage(payload) {
//   try {
//     let activeSession = await mongoConnector.find({
//       query: { userId: payload.results[0].from, $or: [ {status:true},  {"userData.isLogin":true} ] } ,
//       collection: process.env.CONVERSATION_COLLECTION,
//       sort: {_id :-1},
//       limit: 1
//     });

//     await saveMessage(payload.results, activeSession);

//     var sessionAssistantId
//     var sessionUserData = {
//       userId: payload.results[0].from,
//       botKey: botKeysDictionary[payload.results[0].to] ? botKeysDictionary[payload.results[0].to].key : null
//     }
//     if(activeSession[0]) {
//       if(activeSession[0].status) {
//         sessionUserData = activeSession[0].userData
//         sessionAssistantId = activeSession[0].conversationHistory[activeSession[0].conversationHistory.length - 1].assistantId 
//       }
//       else {
//         sessionAssistantId = assistantCreds.initial_logged_assistant_id           
//       }
      
//       if (activeSession[0].userData.isLogin){
//           sessionUserData['isLogin'] = true
//       }     
//     }
//     else {            
//       sessionAssistantId = assistantCreds.initial_not_logged_assistant_id
//     }


//     let ansPayload;
//     payload.results.map(async (result) => {
//       if (result.message.type === "TEXT") {
//         console.log("Sending text messages to assistant.");

//         let response = await assistantController.sendInputMessageToAssistant({
//           userId: result.from,
//           input: result.message.text,
//           infobipInformation: {
//             integrationType: result.integrationType,
//             receivedAt: result.receivedAt,
//             messageId: result.messageId,
//             contact: result.contact,
//             price: result.price,
//             type: result.message.type,
//           },
//           isNew: !!!activeSession[0], // is it good?,
//           userData: sessionUserData,
//           sessionId: activeSession[0] ? activeSession[0].sessionId : null,
//           assistantId: sessionAssistantId
//         });

//         console.log("Received from Assistant!");

//         ansPayload = {
//           telephone: response.telephone,
//           message: response.message,
//         };
//       } else if (result.message.type === "CONTACT") {
//         //receive a list of contacts
//         console.log("Received a contact as a message.")
//         if (result.message.contacts.length == 1) {
//           //if there's one contact

//           console.log("One contact only.")

//           let response = await assistantController.sendInputMessageToAssistant({
//             userId: result.from,
//             input: `${result.message.contacts[0].name.formattedName} ${result.message.contacts[0].phones[0].phone}`,
//             infobipInformation: {
//               integrationType: result.integrationType,
//               receivedAt: result.receivedAt,
//               messageId: result.messageId,
//               price: result.price,
//               type: result.message.type,
//             },
//             isNew: !!!activeSession,
//             userData: sessionUserData,
//             sessionId: activeSession ? activeSession.sessionId : null,
//             assistantId: sessionAssistantId
//           })
  
//           ansPayload = {
//             telephone: response.telephone,
//             message: response.message,
//           };

//         }else{
//           //there's more than one contact

//           console.log("There is more than one contact.")

//           ansPayload = {
//             telephone: result.from,
//             message: ["Por favor, nos informe apenas um contato."]
//           };
//         }
//       } else {
//         console.log("Not recognized message.");

//         ansPayload = {
//           telephone: result.from,
//           message: ["Desculpe, atualmente só entendo mensagens de texto."],
//         };
//       }

//       infobipSendController.send(ansPayload).catch((err) => {
//         throw new Error(err);
//       });
//       console.log("Returned to Whatsapp!");
//     });
//   } catch (err) {
//     throw err;
//   }
// }

// async function saveMessage(results, activeSession) {
//   try {
//     console.log("Save message received from infobip");

//     let conversation = results.map(function (result) {
//       return {
//         input: result.message.text ? result.message.text : null,       
//       };
//     });

//     console.log(conversation);

//     if (!activeSession[0]) {  // user doesnt have a conversation with status or login true      
//       await mongoConnector.save({
//         collection: process.env.CONVERSATION_COLLECTION,
//         document: {
//           userData: {isLogin:false},
//           status: true,
//           startTimestamp: moment.tz("America/Sao_Paulo").unix(),
//           lastTimestamp: moment.tz("America/Sao_Paulo").unix(),          
//           userId: results[0].from,
//         },
//       })
//     } 
//     else {
//       if( activeSession[0].status ) { // user have a conversation with status true       
//         await mongoConnector.updateOne({
//           query: { _id: activeSession[0]._id },
//           collection: process.env.CONVERSATION_COLLECTION,
//           document: {
//             $set: {             
//               status: true,              
//               lastTimestamp: moment.tz("America/Sao_Paulo").unix(),              
//               userId: activeSession[0].userId
//             },
//           },
//         })
//       } else { // user have a conversation with status false but is logged      
//         await mongoConnector.save({
//           collection: process.env.CONVERSATION_COLLECTION,
//           document: {
//             userData: {isLogin:true, botKey: botKeysDictionary[results[0].to] ? botKeysDictionary[results[0].to].key : null},
//             status: true,
//             startTimestamp: moment.tz("America/Sao_Paulo").unix(),
//             lastTimestamp: moment.tz("America/Sao_Paulo").unix(),          
//             userId: results[0].from,
//           },
//         })
//       }
//     }
//   } catch (err) {
//     throw err;
//   }
// }

// module.exports = {
//   repassMessage: repassMessage,
// };
