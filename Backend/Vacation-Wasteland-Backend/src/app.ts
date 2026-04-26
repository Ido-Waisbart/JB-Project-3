import cors from "cors";
import express from "express";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import expressFileUpload from "express-fileupload";

import { appConfig } from "./2-utils/app-config";
import { vacation_controller } from "./5-controllers/vacation-controller";
import { user_controller } from "./5-controllers/user-controller";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { like_controller } from "./5-controllers/likes-controller";

import { vacationMcpServer } from "./4-services/mcp-server";
import { sseHandlers } from "express-mcp-handler";

class App {
    public start(): void {
        try {
            const server = express();
            server.use(cors());
            server.use(express.json());

            // Image config:
            server.use(expressFileUpload());
            const imageLocation = path.join(__dirname, "1-assets", "images");
            fileSaver.config(imageLocation); // Tell this library where to save uploaded images.

            // MCP server:
            const mcpServer = vacationMcpServer.createMcpServer(); // Create the MCP server.
            const factory = () => mcpServer as any; // Create factory function returning the server.
            const { getHandler, postHandler } = sseHandlers(factory, {}); // Create two routers for handling get and post.
            server.get("/sse", getHandler); // Register get handler for getting tool list.
            server.post("/messages", postHandler); // Register post handler for getting data from correct tool.

            server.use(vacation_controller.router);
            server.use(user_controller.router);
            server.use(like_controller.router);

            server.use(errorsMiddleware.routeNotFound);
            server.use(errorsMiddleware.catchAll);
            server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
        } catch (err: any) {
            console.error(err);
        }
    }
}

const app = new App();
app.start();
