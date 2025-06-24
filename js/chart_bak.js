$(function () {
    // highcharts-border-radius.js
    "use strict";
    (function (factory) {
        if (typeof module === "object" && module.exports) {
            module.exports = factory;
        } else {
            factory(Highcharts);
        }
    })(function (Highcharts) {
        (function (H) {
            H.wrap(H.seriesTypes.column.prototype, "translate", function (proceed) {
                const options = this.options;
                const topMargin = options.topMargin || 0;
                const bottomMargin = options.bottomMargin || 0;

                proceed.call(this);

                this.points.forEach(function (point) {
                    if (options.borderRadiusTopLeft || options.borderRadiusTopRight || options.borderRadiusBottomRight || options.borderRadiusBottomLeft) {
                        const w = point.shapeArgs.width;
                        const h = point.shapeArgs.height;
                        const x = point.shapeArgs.x;
                        const y = point.shapeArgs.y;

                        var radiusTopLeft = H.relativeLength(options.borderRadiusTopLeft || 0, w);
                        var radiusTopRight = H.relativeLength(options.borderRadiusTopRight || 0, w);
                        var radiusBottomRight = H.relativeLength(options.borderRadiusBottomRight || 0, w);
                        var radiusBottomLeft = H.relativeLength(options.borderRadiusBottomLeft || 0, w);

                        const maxR = Math.min(w, h) / 2;

                        radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft;
                        radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight;
                        radiusBottomRight = radiusBottomRight > maxR ? maxR : radiusBottomRight;
                        radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft;

                        point.dlBox = point.shapeArgs;

                        point.shapeType = "path";
                        point.shapeArgs = {
                            d: ["M", x + radiusTopLeft, y + topMargin, "L", x + w - radiusTopRight, y + topMargin, "C", x + w - radiusTopRight / 2, y, x + w, y + radiusTopRight / 2, x + w, y + radiusTopRight, "L", x + w, y + h - radiusBottomRight, "C", x + w, y + h - radiusBottomRight / 2, x + w - radiusBottomRight / 2, y + h, x + w - radiusBottomRight, y + h + bottomMargin, "L", x + radiusBottomLeft, y + h + bottomMargin, "C", x + radiusBottomLeft / 2, y + h, x, y + h - radiusBottomLeft / 2, x, y + h - radiusBottomLeft, "L", x, y + radiusTopLeft, "C", x, y + radiusTopLeft / 2, x + radiusTopLeft / 2, y, x + radiusTopLeft, y, "Z"],
                        };
                    }
                });
            });
        })(Highcharts);
    });

    // Highcharts.setOptions({
    //     lang: { thousandsSep: "," }, // 1000 단위로 , 추가. 선언 후에 개별적으로 format변경 필수
    //     title: { text: null },
    //     legend: { enabled: false },
    //     credits: { enabled: false },
    //     xAxis: { labels: { style: { fontSize: "1.4rem" } } },
    //     yAxis: { min: 0, max: 20000, title: null,labels: { style: { fontSize: "1.4rem" }, format: "{value: ,.0f}" }, gridLineColor: "rgba(0,0,0,0.1)", tickInterval: 5000 },
    //     plotOptions: { enabled: false },
    //     tooltip: {
    //         shared: false,
    //         useHTML: true,
    //         shadow: false,
    //         //backgroundColor: '#000',
    //         //headerFormat: '<div><b>{point.key}</b></div>',
    //         formatter: function () {
    //             var bgColor = "#000";
    //             var formattedY = this.y.toLocaleString();
    //             return '<div style="border-radius:.5rem;padding:.7rem 2rem; background-color:' + bgColor + '; color:#eee; font-weight:600; font-size:1.6rem;"><span>' + formattedY + '</span><div style="width:.8rem; height:.8rem; background-color:' + bgColor + '; position:absolute;left:50%;top:100%;transform:rotate(45deg) translate(-50%,-50%);"></div></div>';
    //         },
    //     },
    // });

    Highcharts.setOptions({
        chart: {
            type: "line",
            style: {
                fontFamily: "pretendard",
            },
        },
        title: {
            align: "center",
            style: {
                fontSize: "1.6rem",
                color: "#A5A7B5",
            },
        },
        xAxis: {
            title: {
                style: {
                    fontSize: "1.6rem",
                    color: "#A5A7B5",
                },
            },
            labels: {
                style: {
                    fontSize: "1.4rem",
                },
            },
        },
        yAxis: {
            title: {
                style: {
                    fontSize: "1.6rem",
                    color: "#A5A7B5",
                },
            },
            labels: {
                style: {
                    fontSize: "1.4rem",
                },
            },
        },
        legend: {
            layout: "horizontal",
            align: "right",
            verticalAlign: "top",
            itemStyle: {
                fontSize: "1.4rem",
            },
        },
        tooltip: {
            useHTML: true,
            style: {
                fontSize: "1.6rem",
            },
            shared: true,
            shadow: false,
        },
        credits: { enabled: false },
    });

    Highcharts.chart("chart1", {
        title: {
            text: "At 28.92km, RMSE 2.12",
        },
        xAxis: {
            categories: ["02-22 12", "02-22 12", "02-22 12", "02-22 12", "02-22 12", "02-22 12", "02-22 12", "02-22 12", "02-22 12", "02-22 12"],
            title: {
                text: "Time step",
                style: {
                    fontSize: "1.6rem",
                    color: "#A5A7B5",
                },
                margin: 20,
            },
        },
        yAxis: {
            title: {
                text: "Wind Speed",
            },
            min: 0,
            max: 16,
            tickInterval: 2,
        },
        series: [
            {
                name: "Real",
                data: [10, 9, 8, 7, 6, 9, 8, 7, 6, 9],
                color: "#003399",
                lineWidth: 2,
            },
            {
                name: "Predict",
                data: [8, 10, 9, 11, 10, 12, 10, 8, 10, 7],
                color: "#FF5733",
                lineWidth: 2,
            },
        ],
        tooltip: {
            formatter: function () {
                return `<div class="cTooltip">
                        <div><b>시간:</b> ${this.x}</div>
                        <div><b>관측량:</b> ${this.points[0].y}</div>
                        <div><b>예측량:</b> ${this.points[1].y}</div>
                    </div>`;
            },
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 1200
                    },
                },
            ],
        },
    });
});
