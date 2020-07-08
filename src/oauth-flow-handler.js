import { OAuthAbstractHandler } from "./oauth-abstract-handler";
import { OAuthError } from "./oauth-error";

export class OAuthFlowHandler extends OAuthAbstractHandler {

    /**
     * 
     * @param {OAuthContext} context 
     */
    handle(context) {

        this.checkContext(context);

        var authorization = context.authorization;
        
        // Go on in the handler chain
        super.handle(context);
        
    }

    checkContext(context) {

        super.checkContext(context);       
        if (context.error != null) {
            return;
        }

        if ( context.authorization == null ) { 
            context.error = new OAuthError(OAuthError.ERROR_NO_AUTHORIZATION_AVAILABLE, "No Authorization available!");
        }
    }

}