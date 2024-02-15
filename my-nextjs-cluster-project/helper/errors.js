class Exception extends Error {
    code;

    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

class UnAuthorised extends Exception {
    constructor(message = "Unauthorised") {
        super(401, message);
    }
}

class Forbidden extends Exception {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}

class BadRequest extends Exception {
    constructor(message) {
        super(400, `Bad Request: ${message}`);
    }
}

class NotFound extends Exception {
    constructor() {
        super(404, "Not found");
    }
}
export {
    Exception,
    UnAuthorised,
    Forbidden,
    BadRequest,
    NotFound
}
export default {
    Exception,
    UnAuthorised,
    Forbidden,
    BadRequest,
    NotFound
}
