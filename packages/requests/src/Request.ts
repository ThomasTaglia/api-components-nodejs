/**
 * Information common to all requests targeting services. This information
 * is typically extracted from the headers of an http request.
 */
export default interface Request {
    /**
     * The token that authenticates the request-response interaction. For HTTP
     * interactions, it's extracted from the Authorization header of the HTTP
     * request. For AMQP interactions, it's usually statically defined.
     */
    accessToken: string | null;
    /**
     * A random id identifying the interaction. For HTTP interactions, it's
     * extracted from the X-Request-Id header of the HTTP request. For AMQP
     * interactions, it's the messageId property of the AMQP message.
     */
    requestId: string;
    /**
     * A random id identifying the chain of interactions this interaction
     * belongs to. For HTTP interactions, it's extracted from the
     * X-Correlation-Id header of the HTTP request. For AMQP interactions, it's
     * the correlationId property of the AMQP message.
     */
    correlationId: string;
    /**
     * The app name of the service that initiated the interaction. For HTTP
     * interactions, it's extracted from the X-App-Name header of the HTTP
     * request.
     */
    appName: string;
    /**
     * The app version of the service that initiated the interaction. For HTTP
     * interactions, it's extracted from the X-App-Version header of the HTTP
     * request.
     */
    appVersion: string;
    /**
     * The itemId that initiated the interaction. For HTTP interactions, it's
     * extracted from the X-Item-Id header of the HTTP request.
     */
    itemId?: string;
    /**
     * The managerId that initiated the interaction. For HTTP interactions, it's
     * extracted from the X-Manager-Id header of the HTTP request.
     */
    managerId?: string;
}
