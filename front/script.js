document.addEventListener("DOMContentLoaded", async () => {
  let currentVideo;

  async function fetchData(page, pageSize) {
    try {
      const response = await fetch(`http://0.0.0.0:8000/mp4_links/?page=${page}&page_size=${pageSize}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function createSwiper() {
    return new Swiper(".swiper-container", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      pagination: false,
      init: false,
    });
  }

  async function appendSlides(swiper, page, pageSize) {
    const swipeContents = await fetchData(page, pageSize);

    swipeContents.forEach((link) => {
      const videoContainer = document.createElement("div");
      videoContainer.className = "swiper-slide";

      const video = document.createElement("video");
      video.className = "swiper-slide-video";
      video.src = link;
      video.controls = true;

      // video.addEventListener("loadedmetadata", () => {
      //   video.play();
      // });

      videoContainer.appendChild(video);
      swiper.appendSlide(videoContainer);
    });
  }

  function pauseVideo(video) {
    video.pause();
    video.currentTime = 0;
    video.dispatchEvent(new Event("pause"));
  }

  function playVideo(video) {
    video.play();
    video.dispatchEvent(new Event("play"));
  }

  function playOnClick(video) {
    video.addEventListener("click", () => {
      playVideo(video);
    });
  }

  const swiper = createSwiper();
  swiper.init();
  await appendSlides(swiper, 1, 10);

  document.addEventListener("click", () => {
    if (currentVideo) {
      playVideo(currentVideo);
      swiper.mousewheel.disable();
    }
  });

  swiper.on("slideChange", async () => {
    if (swiper.activeIndex === swiper.slides.length - 1) {
      await appendSlides(swiper, Math.ceil(swiper.slides.length / 10) + 1, 10);
      swiper.update();
    }

    const previousSlide = swiper.slides[swiper.previousIndex];
    const currentSlide = swiper.slides[swiper.activeIndex];

    if (previousSlide) {
      const previousVideo = previousSlide.querySelector(".swiper-slide-video");
      if (previousVideo) {
        pauseVideo(previousVideo);
      }
    }

    if (currentSlide) {
      currentVideo = currentSlide.querySelector(".swiper-slide-video");
      if (currentVideo) {
        playVideo(currentVideo);
        playOnClick(currentVideo);
      }
    }
  });

  swiper.on("init", () => {
    currentVideo = swiper.slides[0].querySelector(".swiper-slide-video");
    if (currentVideo) {
      pauseVideo(currentVideo);
      playOnClick(currentVideo);
    }
  });

  swiper.on("touchEnd", () => {
    if (currentVideo) {
      playVideo(currentVideo);
      swiper.mousewheel.disable();
    }
  });
});
