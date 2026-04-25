import { BarChart } from "@mui/x-charts";
import "./VacationReports.css";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

export function VacationReports() {
    // TODO: Put logic in like service. Probably.
    const allVacations = useSelector((state: AppState) => state.vacationState.vacations);
    // const allLikes = useSelector((state: AppState) => state.likeState.likes);
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

    //allLikes
    allVacations.forEach((v) => {
        vacationIdToLikeCount[v.id]++;
    });
    const barChart_barValueData = Object.values(vacationIdToLikeCount).map(Number);

    return (
        <Box className="VacationReports">
            <Typography variant="h5">Vacation Reports</Typography>
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
