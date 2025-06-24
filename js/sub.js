$(function () {
    /*지도 클릭 이벤트  */
    const markers = document.querySelectorAll(".mk");
    markers.forEach((marker) => {
        marker.addEventListener("click", () => {
            if (marker.classList.contains("active")) {
                marker.classList.remove("active");
            } else {
                markers.forEach((m) => m.classList.remove("active"));
                marker.classList.add("active");
            }
        });
    });
});
