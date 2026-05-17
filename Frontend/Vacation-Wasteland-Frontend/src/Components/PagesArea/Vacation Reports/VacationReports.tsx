import { BarChart } from "@mui/x-charts";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

function buildDataset(arr1: string[], arr2: number[]) {
    return arr1.map((label, i) => ({
        Destination: label,
        Likes: arr2[i] ?? 0,
    }));
}

function exportToCSV(data: any[], filename = "vacation-likes.csv") {
    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const csvRows = [
        headers.join(","), // header row
        ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")),
    ];

    const blob = new Blob([csvRows.join("\n")], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function VacationReports() {
    // TODO: Put logic in like service. Probably. Maybe.
    const allVacations = useSelector((state: AppState) => state.vacationState.vacations);
    const allLikes = useSelector((state: AppState) => state.likeState.likes);
    // const barChart_barValueData = allLikes.map(like => like.userId);
    // const barChart_barNameData = allVacations.map((vacation) => vacation.destination);
    // const barChart_barValueData = allVacations.map(vacation => like.userId);
    const barChart_barValueDataMap: Record<number, string> = allVacations.reduce<Record<number, string>>(
        (dict, vacation) => {
            dict[vacation.id] = vacation.destination;
            return dict;
        },
        {},
    );
    const vacationIds = Object.keys(barChart_barValueDataMap).map(Number);
    const barChart_barLabelData = Object.values(barChart_barValueDataMap);

    const vacationIdToLikeCount: Record<number, number> = vacationIds.reduce<Record<number, number>>(
        (dict, vacationId) => {
            dict[vacationId] = 0;
            return dict;
        },
        {},
    );

    allLikes.forEach((like) => {
        vacationIdToLikeCount[like.vacation_id]++;
    });
    const barChart_barValueData = Object.values(vacationIdToLikeCount).map(Number);

    return (
        <Box className="VacationReports">
            <Typography variant="h5">Vacation Reports</Typography>

            <br />

            <Button
                variant="contained"
                onClick={() => exportToCSV(buildDataset(barChart_barLabelData, barChart_barValueData))}
            >
                Export CSV
            </Button>

            <br />
            <br />
            <br />

            <BarChart
                // xAxis={[{ data: ["vaca A", "vaca B", "vaca C"] }]}
                // series={[{ data: [4, 3, 5], label: "Vacation Likes" }]}
                xAxis={[
                    {
                        data: barChart_barLabelData,
                    },
                ]}
                margin={{ bottom: 80 }}
                yAxis={[{ tickMinStep: 1 }]}
                series={[
                    {
                        data: barChart_barValueData,
                        label: "Vacation Likes",
                        valueFormatter: (value, context) => "" + value,
                    },
                ]}
                height={300}
                grid={{ horizontal: true, vertical: true }}
                title="Vacations Report"
                colors={["#76428a"]}
            />
        </Box>
    );
}
