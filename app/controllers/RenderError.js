/**
 * @version 1.0.0
 * @description Renderring error class
 */
class RenderError {
    _request;
    _response;
    constructor(request, response) {
        this._request = request;
        this._response = response;
    }
    get request() {
        return this._request;
    }
    get response() {
        return this._response;
    }
    renderError(error) {
        console.error(error);
        this.request.session.message.error = error.message;
        this.response.redirect('/');
    }
}

module.exports = RenderError;
