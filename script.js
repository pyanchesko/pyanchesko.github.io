document.addEventListener("DOMContentLoaded", () => {
  const swipeContents = [
    { content: "Swipeable Content 1", backgroundColor: "red" },
    { content: "Swipeable Content 2", backgroundColor: "blue" },
    { content: "Swipeable Content 3", backgroundColor: "green" },
  ];

  const container = document.getElementById("container");

  swipeContents.forEach((contentObj) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.textContent = contentObj.content;
    slide.style.backgroundColor = contentObj.backgroundColor;
    container.appendChild(slide);
  });

  const swiper = new Swiper(".swiper-container", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    pagination: false,
    init: false,
  });

  swiper.init();
});
