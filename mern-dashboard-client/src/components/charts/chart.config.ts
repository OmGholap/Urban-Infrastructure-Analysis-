import { ApexOptions } from "apexcharts";

export const TotalRevenueSeries = [
    {
        name: "This month",
        data: [0, 110, 115, 100, 128],
    },
    // {
    //     name: "Running Month",
    //     data: [95, 84, 72, 44, 108],
    // },
];

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "55%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ["transparent"],
        width: 4,
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
    yaxis: {
        title: {
            text: "",
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
    },
    // tooltip: {
    //     y: {
    //         formatter(val: number) {
    //             return `$ ${val} thousands`;
    //         },
    //     },
    // },
};
