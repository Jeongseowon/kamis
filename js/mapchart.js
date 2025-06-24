var ROOT_PATH = "../"; // SVG 파일 경로
var myChart = echarts.init(document.getElementById("jjmapChart"));

$(function () {
    $.get(ROOT_PATH + "images/common/jejuMap.svg", function (svg) {
        echarts.registerMap("jeju", { svg: svg });

        var option = {
            geo: {
                map: "jeju",
                roam: true,
                layoutCenter: ["50%", "50%"],
                layoutSize: "800px",
                itemStyle: {
                    normal: {
                        areaColor: "#f5f7fa",
                        borderColor: "#d0d0d0",
                    },
                    emphasis: {
                        areaColor: "#e6e8ea",
                    },
                },
            },
        };

        myChart.setOption(option);
    });
    window.addEventListener("resize", function () {
        myChart.resize();
    });
});
