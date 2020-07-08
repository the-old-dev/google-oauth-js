# The tests sample

This sample shows the usage of the OAuth classes.

## Files

All files of the sample are in the folder "/tests".

- login.html, js/login.js are the HTML UI and the javascript logic for the login
- oauth2callback.html, js/oauth2callback.js are the HTML UI and the javascript logic for the google login response
-js/Secrets.js has to be created with the following content:
```
class Secrets {
 static getClientId() {
  return "<your google client secret>";
 }
}
module.exports = Secrets;
```
- js/system-config.js, \lib\*.js contains the libraries to run the classes with "modules.exports" and "require()" in the browser.
-app.js is the expressJS server app to deliver the files from a webserver

Have a look into these files to understand the coding and usage. Basically you use the context factory to create a context and then run the startChain to handle the flow.

## Create the Google prerequisites

- Follow the guide in https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#prerequisites
- Additionally to make this sample work: Go to https://console.developers.google.com/apis/credentials and edit the OAuth 2.0 Cleint ID for your web App. There add "http://localhost:8000/tests/oauth2callback.html" as an "Authorised redirect URI". And make shure "http://localhost:8000" is an "URI" there.