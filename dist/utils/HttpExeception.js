class HttpExeception extends Error {
    message;
    status;
    error;
    constructor(message, status, error) {
        super(message);
        this.status = status;
        this.message = message;
        this.error = error;
    }
}
export default HttpExeception;
