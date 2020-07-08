import { OAuthAbstractHandler } from "./oauth-abstract-handler";
import { OAuthError } from "./oauth-error";

export class OAuthResponseHandler extends OAuthAbstractHandler {

    handle(context) {
        var parameters = this._decodeParameters();

        if (Object.keys(parameters).length == 0) {
            parameters["error"] = "No parameters handed!";
        }

        if (parameters["error"] == null) {
            var now = Date.now();
            parameters["expires_at"] = now + (parameters["expires_in"] * 1000);
            parameters["client_id"] = context.clientId;
            context.authorization = parameters;
        } else {
            context.error = new OAuthError(OAuthError.ERROR_UNEXPECTED, parameters["error"]);
        }

        super.handle(context);
    }

    /**
     * @see https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#handlingresponse
     */
    _decodeParameters() {

        // Grab the parameters from the url
        var fragmentString = location.hash.substring(1);

        // Parse query string to see if page request is coming from OAuth 2.0 server.
        var params = {};
        var regex = /([^&=]+)=([^&]*)/g, m;

        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        // Korrect the int values
        if (Object.keys(params).length > 0) {
            params["expires_in"] = parseInt(params["expires_in"]);
            params["authuser"] = parseInt(params["authuser"]);
        }

        return params;
    }

};