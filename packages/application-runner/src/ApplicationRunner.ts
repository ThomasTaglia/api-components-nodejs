import { Logger, getUnknownErrorDetails } from "@cryptoaddicteds/acn-logger";
import Runnable from "./Runnable";

export default class ApplicationRunner {
    constructor(
        private logger: Logger,
        private runnables: Runnable[],
        private process: NodeJS.Process = global.process
    ) {}

    async run() {
        this.registerErrorHandlers();
        this.registerSignalHandlers();
        await this.start();
    }

    private registerErrorHandlers() {
        this.process.on("uncaughtException", (error: any) => {
            this.logger.error({
                message: "Process uncaught exception",
                type: "APPLICATION_ERROR",
                details: getUnknownErrorDetails(error),
            });
        });
        this.process.on("unhandledRejection", (error: any) => {
            this.logger.error({
                message: "Process unhandled rejection",
                type: "APPLICATION_ERROR",
                details: getUnknownErrorDetails(error),
            });
        });
    }

    private registerSignalHandlers() {
        this.process.on("SIGTERM", () => this.stop());
        this.process.on("SIGINT", () => this.stop());
        this.process.on("SIGQUIT", () => this.stop());
    }

    private async start() {
        try {
            for (const runnable of this.runnables) {
                this.logger.info({
                    message: `Starting ${runnable.constructor.name}`,
                });
                await runnable.start();
                this.logger.info({
                    message: `${runnable.constructor.name} started`,
                });
            }
        } catch (error) {
            this.logger.fatal({
                message: "Error starting app",
                type: "APPLICATION_ERROR",
                details: getUnknownErrorDetails(error),
            });
            this.process.exit(1);
        }
    }

    private async stop() {
        try {
            for (const runnable of [...this.runnables].reverse()) {
                this.logger.info({
                    message: `Stopping ${runnable.constructor.name}`,
                });
                await runnable.stop();
                this.logger.info({
                    message: `${runnable.constructor.name} stopped`,
                });
            }
            this.process.exit(0);
        } catch (error) {
            this.logger.fatal({
                message: "Error stopping app",
                type: "APPLICATION_ERROR",
                details: getUnknownErrorDetails(error),
            });
            this.process.exit(1);
        }
    }
}
