export class OAuthError {

    static ERROR_NO_AUTHORIZATION_AVAILABLE = -1;
    static ERROR_NO_CLIENT_ID_AVAILABLE = -2;
    static ERROR_NO_SCOPE_AVAILABLE = -3
    static ERROR_NO_REDIRECT_URL_AVAILABLE = -4;
    static ERROR_UNEXPECTED = 5;

    static errorIfIsNullOrEmptyString(name, value) {
        if (this.isNullOrEmptyString(value)) {
            return this._createNullOrEmptyError(name);
        } else {
            return null;
        }
    }

    static throwIfIsNullOrEmptyString(name, value) {
        if (this.isNullOrEmptyString(value)) {
            throw name + " must not be null or a empty string!";
        }
    }

    static isNullOrEmptyString(value) {
        var emptyString = new String("");
        return ((value == null) || (emptyString == value));
    }

    static _createNullOrEmptyError(name) {
        var error = null;
        switch (name) {
            case "authorization":
                error = new OAuthError(OAuthError.ERROR_NO_AUTHORIZATION_AVAILABLE, "No authorization available!");
                break;
            case "client_id":
                error = new OAuthError(OAuthError.ERROR_NO_CLIENT_ID_AVAILABLE, "No client_id available!");
                break;
            case "scope":
                error = new OAuthError(OAuthError.ERROR_NO_SCOPE_AVAILABLE, "No scope available!");
                break;
            case "redirect_url":
                error = new OAuthError(OAuthError.ERROR_NO_REDIRECT_URL_AVAILABLE, "No redirect_url available!");
                break;

            default:
                error = new OAuthError(OAuthError.ERROR_UNEXPECTED, "No " + name +" available!");
                break;
        }
        return error;
    }

    constructor(code, description) {
        this.code = code;
        this.description = description;
    }

}