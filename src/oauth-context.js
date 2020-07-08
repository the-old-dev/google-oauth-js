export class OAuthContext { 
    
    constructor() {
        this.scope = null;
        this.redirectUrl = null;
        this.error = null;
        this.startChain = null;
        this.errorChain = null;
        this.flowChain = null;
    }

    startFlow() {
        this.startChain.handle(this);
    }

    // === Local Storage ===
    set clientId(aClientId) {
        localStorage.setItem("clientId", aClientId);
    }

    get clientId() {
        return localStorage.getItem("clientId"); 
    }

    get authorization() {
        var authorization = this._authorization;
        
        if (!this._isAuthorizationValid(authorization)) {
            authorization = null;
            this._authorization = null;
        }

        return authorization;
    }

    set authorization(aAuthorization) {

        // Only save null or a valid authorization
        if ((aAuthorization == null)) {
            this._authorization = aAuthorization;
        } else if (this._isAuthorizationValid(aAuthorization)) {
            this._authorization = aAuthorization;
        }
    }

    // === Session Storage ===
    get _authorization() {
        var authorization = sessionStorage.getItem("authorization");
        if (authorization != null) {
            authorization = JSON.parse(authorization);
        }
        return authorization;
    }

    set _authorization(aAuthorization) {
        sessionStorage.setItem( 'authorization', JSON.stringify(aAuthorization) ); 
    }

    _isAuthorizationValid(authorization) {
        return (
            (authorization != null) &&
            (!this._isAuthorizationExpired(authorization))
        );
    }

    _isAuthorizationExpired(authorization) {
        var now = Date.now();
        return (authorization["expires_at"]<now);
    }

}