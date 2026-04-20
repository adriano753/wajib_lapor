document.body.style.overflow = "hidden";

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
        document.body.style.overflow = "auto";
    }, 500);
});