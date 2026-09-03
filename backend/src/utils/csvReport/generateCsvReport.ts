import { Parser } from "json2csv";
import { IRevenueReport } from "../../dtos/report/res.reportDto";

export function createRevenueReportCsv(
    report: IRevenueReport
): Buffer {

    const rows = report.orders.map((order) => ({
        Date: new Date(order.date).toLocaleDateString("en-IN"),

        OrderId: order.orderId.toString(),

        Product: order.productName,

        Quantity: order.quantity,

        Price: order.price,

        Total: order.total,

        PaymentStatus: order.paymentStatus,

        OrderStatus: order.orderStatus,

    }));

    const fields = [
        "Date",
        "OrderId",
        "Product",
        "Quantity",
        "Price",
        "Total",
        "PaymentStatus",
        "OrderStatus",
    ];

    const parser = new Parser({
        fields,
    });

    const csv = parser.parse(rows);

    return Buffer.from(csv, "utf-8");
}
