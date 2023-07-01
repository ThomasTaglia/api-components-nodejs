export default interface HttpError {
    code: number;
    status: string;
    message: string;
    details?: any;
}
