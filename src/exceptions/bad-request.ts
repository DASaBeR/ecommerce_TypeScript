import { ErrorCodes, HttpExceptions } from "./root";

export class BadRequestsErrors extends HttpExceptions {
    constructor(message:string, errorCode:ErrorCodes){
        super(message, errorCode, 400, null)
    }
}