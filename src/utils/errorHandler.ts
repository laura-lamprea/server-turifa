export default class ErrorHandler extends Error {
    public statusNumber: number;
    constructor(message: string, statusNumber = 400) {
        super(message);
        this.name = "ErrorHandler";
        this.statusNumber = statusNumber;
    }
}