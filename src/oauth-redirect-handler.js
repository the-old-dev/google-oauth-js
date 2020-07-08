import { OAuthAbstractHandler } from "./oauth-abstract-handler";
import { OAuthError } from "./oauth-error";

export class OAuthRedirectHandler extends OAuthAbstractHandler {

    constructor(redirectUrl) {
        super();
        this._redirectUrl = redirectUrl;
        OAuthError.throwIfIsNullOrEmptyString("_redirectUrl", this._redirectUrl);
    }

    handle (context) {
        window.location.replace(this._redirectUrl);
    }

}