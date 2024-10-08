/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

'use strict';

//const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const blockedPhrases = new RegExp(/porn|sexy/);  // No thank you.

/**
 * Returns the response body of the requested url, url should be encoded with encodeURIComponent if there are additional
 * parameters for the requested url.
 *
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' \
 *        -d '{"url": "https://api.ipify.org/?format=json"}' \
 *        https://us-central1-<project-id>.cloudfunctions.net/cors
 *
 * This endpoint supports CORS.
 */
exports.cors = onRequest(
  {cors: true},
  (req, res) => {
    console.log('Query:', req.query);
    console.log('Body:', typeof req.body, req.body);
    
    let url = req.query.url;

    if (req?.query) {
        for (let index = 0; index < Object.keys(req?.query).length; index++) {
            const key = Object.keys(req?.query)[index];
            const value = Object.values(req?.query)[index];

            if (key !== "url") {
                url = url + "&" + key + "=" + value
            }
        }
    }

    console.log('URL: ', url);

    if (!url) {
      url = req.body.url;
    }

    if (!url) {
      res.status(403).send('URL is empty.');
    }

    console.log('Request:', url);

    // disallow blocked phrases
    if (url.match(blockedPhrases)) {
      res.status(403).send('Phrase in URL is disallowed.');
    }

    var fetchParams = {
        method: req.method,
        headers: {
          'Content-Type': req.get('content-type'),
          'Origin': 'https://app.uniswap.org',
          'Host': 'interface.gateway.uniswap.org'
        }
    }

    if (Object.keys(req?.body).length > 0) {
        fetchParams.body = req.get('content-type') === 'application/json' ? JSON.stringify(req.body) : req.body;
    }

    fetch(url, fetchParams)
    .then(r => {
        console.log(r.headers)
        if (r.headers.get('content-type') === 'application/json' || 
            r.headers.get('content-type') === 'application/json;charset=UTF-8') {
            return r.json()
        }
        return r.text()
    })
    .then(body => res.status(200).send(body));
  });