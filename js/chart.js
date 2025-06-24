function initializeChart(chartId, option) {
    const chartElement = document.getElementById(chartId);
    if (chartElement) { // DOM 존재 확인
        let myChart = echarts.init(chartElement);
        myChart.setOption(option);
    }
}
//chart1 옵션
const chart1Option = {
    title: {
        text: "28.92km, RMSE 2.12", // 차트 제목
        left: "center",
        textStyle: {
            color: "#A5A7B5",
            fontSize: 16,
        },
    },
    grid: {
        containLabel: true,
        left: "5%",
        right: "0",
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        borderColor: "#aaa",
        borderWidth: 1,
        textStyle: {
            color: "#fff",
            fontSize: 12,
        },
        formatter: function (params) {
            var time = params[0].axisValue;
            var realValue = params[0].data;
            var predictValue = params[1].data;
            return `
            <div>
                <b>시간:</b> ${time}<br>
                <b>실제 값:</b> ${realValue}<br>
                <b>예측 값:</b> ${predictValue}
            </div>
        `;
        },
    },
    legend: {
        data: ["Real", "Predict"],
        top: "0",
        right: "0",
    },
    xAxis: {
        type: "category",
        name: "Time step",
        nameLocation: "middle",
        nameGap: 35,
        data: ["02-22 12", "02-22 13", "02-22 14", "02-22 15", "02-22 16", "02-22 17", "02-22 18", "02-22 19"],
    },
    yAxis: {
        type: "value",
        name: "Wind Speed",
        nameLocation: "middle",
        nameGap: 35,
    },
    series: [
        {
            name: "Real",
            type: "line",
            data: [8, 6, 7, 5, 10, 12, 16, 16],
            lineStyle: { color: "#5470C6" },
            itemStyle: { color: "#5470C6" },
        },
        {
            name: "Predict",
            type: "line",
            data: [10, 12, 11, 15, 9, 8, 15, 5],
            lineStyle: { color: "#EE6666" },
            itemStyle: { color: "#EE6666" },
        },
    ],
};

//chart2 옵션
const chart2Option = {
    title: {
        text: "시간별 SMP 비교",
        left: "center",
        textStyle: {
            color: "#A5A7B5",
            fontSize: 16,
        },
    },
    grid: {
        containLabel: true,
        left: "5%",
        right: "0",
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        borderColor: "#aaa",
        borderWidth: 1,
        textStyle: {
            color: "#fff",
            fontSize: 12,
        },
        formatter: function (params) {
            var time = params[0].axisValue;
            var inlandValue = params[0].data;
            var jejuValue = params[1].data;
            return `
            <div>
                <b>시간:</b> ${time}<br>
                <b>육지 SMP:</b> ${inlandValue} 원/kWh<br>
                <b>제주 SMP:</b> ${jejuValue} 원/kWh
            </div>
        `;
        },
    },
    legend: {
        data: ["Real", "Predict"],
        top: "0",
        right: "0",
    },
    xAxis: {
        type: "category",
        name: "Time step",
        nameLocation: "middle",
        nameGap: 35,
        data: ["10월 22일 00:00", "10월 22일 01:00", "10월 22일 02:00", "10월 22일 03:00", "10월 22일 04:00"],
    },
    yAxis: {
        type: "value",
        name: "SMP",
        nameLocation: "middle",
        nameGap: 35,
    },
    series: [
        {
            name: "Real",
            type: "line",
            data: [120, 130, 140, 150, 160],
            lineStyle: { color: "#FF8C00" },
            itemStyle: { color: "#FF8C00" },
        },
        {
            name: "Predict",
            type: "line",
            data: [100, 110, 115, 120, 125],
            lineStyle: { color: "#4169E1" },
            itemStyle: { color: "#4169E1" },
        },
    ],
};

// chart3 옵션
const chart3Option = {
    title: {
        text: "시간별 SMP 예측",
        left: "center",
        textStyle: {
            color: "#A5A7B5",
            fontSize: 16,
        },
    },
    grid: {
        containLabel: true,
        left: "5%",
        right: "0",
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        borderColor: "#aaa",
        borderWidth: 1,
        textStyle: {
            color: "#fff",
            fontSize: 12,
        },
        formatter: function (params) {
            var time = params[0].axisValue;
            var inlandValuee = params[0].data;
            var jejuValuee = params[1].data;
            return `
<div>
    <b>시간:</b> ${time}<br>
    <b>육지 SMP:</b> ${inlandValuee} 원/kWh<br>
    <b>제주 SMP:</b> ${jejuValuee} 원/kWh
</div>
`;
        },
    },
    legend: {
        data: ["Real", "Predict"],
        top: "0",
        right: "0",
    },
    xAxis: {
        type: "category",
        name: "Time step",
        nameLocation: "middle",
        nameGap: 35,
        data: ["10월 22일 00:00", "10월 22일 01:00", "10월 22일 02:00", "10월 22일 03:00", "10월 22일 04:00"],
    },
    yAxis: {
        type: "value",
        name: "SMP",
        nameLocation: "middle",
        nameGap: 35,
    },
    series: [
        {
            name: "Real",
            type: "line",
            data: [30, 120, 160, 250, 100],
            lineStyle: { color: "#FFF000" },
            itemStyle: { color: "#FFF000" },
        },
        {
            name: "Predict",
            type: "line",
            data: [100, 75, 115, 32, 125],
            lineStyle: { color: "#3677E1" },
            itemStyle: { color: "#3677E1" },
        },
    ],
};
initializeChart("chart1", chart1Option);
initializeChart("chart2", chart2Option);
initializeChart("chart3", chart3Option);