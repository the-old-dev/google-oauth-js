import {  OAuthContext } from "./oauth-context";
import {  OAuthFlowHandler } from "./oauth-flow-handler";
import {  OAuthResultHandler } from "./oauth-result-handler";
import {  OAuthErrorHandler } from "./oauth-error-handler";
import {  OAuthSigninHandler } from "./oauth-signin-handler";
import {  OAuthResponseHandler } from "./oauth-response-handler";
import {  OAuthRedirectHandler } from "./oauth-redirect-handler";

export class OAuthContextFactory {

    static createLoginContext(scope, redirectUrl, callback, errorCallback) {
        
        var context = new OAuthContext();

        // members
        context.scope = scope;
        context.redirectUrl = redirectUrl;

        // start chain
        context.startChain = new OAuthFlowHandler();
        context.startChain.add(new OAuthResultHandler(callback));
        
        // error chain
        context.errorChain = this._getErrorChain(errorCallback);
        
        // flow chain
        context.flowChain = new OAuthSigninHandler();
        
        return context;
    }

    static createLoginResponseContext(goBackToUrl, callback, errorCallback) {
        
        var context = new OAuthContext();
        
        // start chain
        context.startChain = new OAuthResponseHandler();
        context.startChain.add(new OAuthResultHandler(callback)).add( new OAuthRedirectHandler(goBackToUrl) );

        // error chain
        context.errorChain = this._getErrorChain(errorCallback);
        
        return context;

    }

    static _getErrorChain(errorCallback) {

        // chain
        var chain = new OAuthErrorHandler();
        chain.add(new OAuthResultHandler(errorCallback));
        
        return chain;
    }

}