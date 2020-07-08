import { OAuthAbstractHandler } from "./oauth-abstract-handler";

export class OAuthResultHandler extends OAuthAbstractHandler {

    constructor(callback) {
        super();
        this.callback = callback;
    }

    handle(context) {
        if (this.callback != null) {
            if (context.error == null) {
                this.callback(context.authorization);
            } else {
                this.callback(context.error);
                // finish chain execution & prevent error loop
                context.error = null;
            }
        }
        super.handle(context);
    }

}