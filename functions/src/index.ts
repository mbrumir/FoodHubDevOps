/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// const serviceAccount = require(
//     "./foodhub-843ba-firebase-adminsdk-dskhe-c18225d7d8.json",
// );

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const {onCall} = require("firebase-functions/v2/https");
// const admin = require("firebase-admin");


// const SECRET_KEY = '0x4AAAAAAASRXMK-OVMzASeNhi1OVnPZO9E';



// async function handlePost(request: any) {
    //     const body = await request.formData();
    //     const token = body.get('cf-turnstile-response');
    //     const ip = request.headers.get('CF-Connecting-IP');
    
    //     let formData = new FormData();
    //     formData.append('secret', SECRET_KEY);
    //     formData.append('response', token);
    //     formData.append('remoteip', ip);
    
    //    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    // 	const result = await fetch(url, {
        // 		body: formData,
        // 		method: 'POST',
        // 	});
        
        //     const outcome = await result.json();
        //     if (!outcome.success) {
            //         return new Response('The provided Turnstile token was not valid! \n' + JSON.stringify(outcome));
            //     }
            //     return new Response('Turnstile token successfuly validated. \n' + JSON.stringify(outcome));
            // }
            
            // exports.verifyTurnstileToken = onCall(
                //     {cors: true},
                //     async (request: any) => {
                    //         await handlePost(request);
                    //     },
                    // );
                    
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as serviceAccount from "./foodhub-843ba-firebase-adminsdk-dskhe-c18225d7d8.json" ;
import fetch from 'node-fetch';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

admin.initializeApp();

const SECRET_KEY: string = "0x4AAAAAAASRXMK-OVMzASeNhi1OVnPZO9E";

export const verifyToken = functions.https.onRequest(async (req:any, res:any) => {
    if (req.method !== 'POST') {
        return res.status(400).send('Only POST requests are allowed');
    }
    
    const token: string = req.body["cf-turnstile-response"];
    const email: string = req.body.email;
    
    if (!token || !email) {
        return res.status(400).send('Missing token or email in request body');
    }
    
    const formData = new FormData();
    formData.append("secret", SECRET_KEY);
    formData.append("response", token);
    
    const url: string = "https://challanges.cloudflare.com/turnstile/v0/siteverify";
    
    try {
        const result = await fetch(url, {
            body: formData,
            method: "POST",
        });
        
        const outcome = await result.json();
        
        // Do something with outcome, like saving it to Firestore
        await admin.firestore().collection('verifications').add({ email, outcome });

        res.send({ email, outcome });
    } catch (error) {
        console.error('Error occurred while verifying token:', error);
        res.status(500).send('Internal server error');
    }
});
