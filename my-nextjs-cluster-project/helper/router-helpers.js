const { NextRequest, NextResponse } = require("next/server");
const {
  BadRequest,
  Exception,
  Forbidden,
  NotFound,
  UnAuthorised
} = require("./errors");

function wrapError(fn) {
  return async function (req, context) {
    try {
      const response = await fn(req, context);
      return NextResponse.json(response);
    } catch (e) {
      if (e instanceof UnAuthorised) {
        return NextResponse.json({
          code: e.code,
          message: e.message
        }, { status: 401 });
      } else if (e instanceof Forbidden) {
        return NextResponse.json({
          code: e.code,
          message: e.message
        }, { status: 403 });
      } else if (e instanceof NotFound) {
        return NextResponse.json({
          code: e.code,
          message: e.message
        }, { status: 404 });
      } else if (e instanceof BadRequest) {
        return NextResponse.json({
          code: e.code,
          message: e.message
        }, { status: 400 });
      } else if (e instanceof Exception) {
        return NextResponse.json({
          code: e.code,
          message: e.message
        }, { status: 503 });
      } else {
        console.error(req.url, "\n", e);
        return NextResponse.json({
          code: e.code,
          message: e.message
        }, { status: 500 });
      }
    }
  }
}

module.exports = { wrapError };
