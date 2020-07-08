import { OAuthError }from "./oauth-error";
import { OAuthAbstractHandler } from "./oauth-abstract-handler";

export class OAuthErrorHandler extends OAuthAbstractHandler {

    handle(context) {
        if (context.error.code == OAuthError.ERROR_NO_AUTHORIZATION_AVAILABLE) {
            // This triggers the normal flow
            context.error = null;
            context.flowChain.handle(context);
        } else {
            // No chance to correct anything, delegate to the next in the chain
            this._next.handle(context);
        }
    }

}