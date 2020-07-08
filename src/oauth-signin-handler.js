import { OAuthAbstractHandler } from "./oauth-abstract-handler";
import { OAuthError } from "./oauth-error";

export class OAuthSigninHandler extends OAuthAbstractHandler {
    handle(context) {
        this.checkContext(context);

        if (context.error != null) {
            super.handle(context);
            return;
        }

        var scope = context.scope;
        var redirectUrl = context.redirectUrl;
        var clientId = context.clientId;
        
        this._oauthSignIn(clientId,redirectUrl,scope);
    }

    checkContext(context) {
        super.checkContext(context);
        
        context.error = OAuthError.errorIfIsNullOrEmptyString("scope", context.scope);
        if (context.error != null) {
            return;
        }

        context.error = OAuthError.errorIfIsNullOrEmptyString("redirect_url", context.redirectUrl);
        if (context.error != null) {
            return;
        }
    }

    /*
    * Create form to request access token from Google's OAuth 2.0 server.
    * @see https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#redirecting
    */
    _oauthSignIn(clientId, redirectUrl, scope) {

        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {
            'client_id': clientId,
            'redirect_uri': redirectUrl,
            'response_type': 'token',
            'scope': scope,
            'include_granted_scopes': 'true',
            'state': 'pass-through value'
        };

        // Add form parameters as hidden input values.
        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }
}