import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { vacation_service } from "./vacation-service";
import { mcpHelper } from "../2-utils/mcp-helper";

class McpTools {
    // Get tool result for all vacations:
    public async getAllVacationsTool(): Promise<CallToolResult> {
        console.log("starting getAllVacationsTool");

        // Get all vacations:
        const vacations = await vacation_service.getAllVacations();

        const resultPayload = {
            vacations,
        };

        // Return tool result:
        return mcpHelper.getToolResult(resultPayload);
    }
}

export const mcpTools = new McpTools();
