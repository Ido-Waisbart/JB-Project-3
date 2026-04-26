import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpRegister } from "./mcp-register";

class VacationMcpServer {

    // Create MCP server: 
    public createMcpServer(): McpServer {

        // Create mcp server: 
        const mcpServer = new McpServer({
            name: "vacation-mcp",
            version: "1.0.0"
        });

        // Register tools: 
        // mcpRegister.registerGetAllOrdersTool(mcpServer);
        // mcpRegister.registerGetOrdersByYearTool(mcpServer);
        mcpRegister.registerGetAllVacationsTool(mcpServer);
        // mcpRegister.registerGetAllOrderDetailsTool(mcpServer);

        // Return the MCP server:
        return mcpServer;
    }

}

export const vacationMcpServer = new VacationMcpServer();
