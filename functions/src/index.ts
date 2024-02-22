/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// const serviceAccount = require(
//     "./foodhub-843ba-firebase-adminsdk-dskhe-c18225d7d8.json",
// );

import * as serviceAccount from "./foodhub-843ba-firebase-adminsdk-dskhe-c18225d7d8.json" ;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const SECRET_KEY = '0x4AAAAAAASRXMK-OVMzASeNhi1OVnPZO9E';



async function handlePost(request: any) {
    const body = await request.formData();
    const token = body.get('cf-turnstile-response');
    const ip = request.headers.get('CF-Connecting-IP');

    let formData = new FormData();
    formData.append('secret', SECRET_KEY);
    formData.append('response', token);
    formData.append('remoteip', ip);

   const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

    const outcome = await result.json();
    if (!outcome.success) {
        return new Response('The provided Turnstile token was not valid! \n' + JSON.stringify(outcome));
    }
    return new Response('Turnstile token successfuly validated. \n' + JSON.stringify(outcome));
}

exports.verifyTurnstileToken = onCall(
    {cors: true},
    async (request: any) => {
        await handlePost(request);
    },
);