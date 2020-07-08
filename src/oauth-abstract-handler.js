import { OAuthError } from "./oauth-error";

export class OAuthAbstractHandler {

    add(next) {
        this._next = next;
        return this._next;
    }

    handle(context) {
        this.checkContext(context);
        if (context.error == null) {
            if (this._next != null) {
                this._next.handle(context);
            }
        } else {
            context.errorChain.handle(context);
        }
    }

    checkContext(context) {
        if (context.error == null) {
            context.error = OAuthError.errorIfIsNullOrEmptyString("client_id", context.clientId);
        }
    }

}