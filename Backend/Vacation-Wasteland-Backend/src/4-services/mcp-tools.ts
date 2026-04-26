import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { vacation_service } from "./vacation-service";
import { mcpHelper } from "../2-utils/mcp-helper";

class McpTools {

    // Get tool result for all orders: 
    // public async getAllOrdersTool(): Promise<CallToolResult> {

    //     console.log("starting getAllOrdersTool");

    //     // Get all orders: 
    //     const orders = await orderService.getAllOrders();

    //     // Return tool result:
    //     return mcpHelper.getToolResult(orders);
    // }

    // // Get tool result for orders by year:
    // public async getOrdersByYearTool(args: { year: number }): Promise<CallToolResult> {

    //     console.log("starting getOrdersByYearTool, year: " + args.year);

    //     // Get orders by year:
    //     const orders = await orderService.getOrdersByYear(args.year);

    //     // Return tool result:
    //     return mcpHelper.getToolResult(orders);
    // }

    // Get tool result for all vacations: 
    public async getAllVacationsTool(): Promise<CallToolResult> {

        console.log("starting getAllVacationsTool");

        // Get all vacations: 
        const vacations = await vacation_service.getAllVacations();

        // Return tool result:
        return mcpHelper.getToolResult(vacations);
    }

    // Get tool result for all order-details: 
    // public async getAllOrderDetailsTool(): Promise<CallToolResult> {

    //     console.log("starting getAllOrderDetailsTool");

    //     // Get all order-details: 
    //     const orderDetails = await orderService.getAllOrderDetails();

    //     // Return tool result:
    //     return mcpHelper.getToolResult(orderDetails);
    // }
}

export const mcpTools = new McpTools();
