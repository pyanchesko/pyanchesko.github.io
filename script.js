document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const swipeContents = [
      { content: "Swipeable Content 1", backgroundColor: "red" },
      { content: "Swipeable Content 2", backgroundColor: "blue" },
      { content: "Swipeable Content 3", backgroundColor: "green" },
  ];

  let currentIndex = 0;
  let touchStartY = 0;
  let touchMoveY = 0;

  function createSwipeContent(content, backgroundColor, translateY) {
      const swipeContent = document.createElement("div");
      swipeContent.classList.add("swipe-content");
      swipeContent.textContent = content;
      swipeContent.style.backgroundColor = backgroundColor;
      swipeContent.style.transform = `translateY(${translateY}%)`;
      return swipeContent;
  }

  function updateSwipeContent() {
      container.innerHTML = "";
      const currentContent = createSwipeContent(swipeContents[currentIndex].content, swipeContents[currentIndex].backgroundColor, 0);
      currentContent.style.opacity = 1;
      container.appendChild(currentContent);

      if (currentIndex > 0) {
          const prevContent = createSwipeContent(swipeContents[currentIndex - 1].content, swipeContents[currentIndex - 1].backgroundColor, -100);
          container.appendChild(prevContent);
      }

      if (currentIndex < swipeContents.length - 1) {
          const nextContent = createSwipeContent(swipeContents[currentIndex + 1].content, swipeContents[currentIndex + 1].backgroundColor, 100);
          container.appendChild(nextContent);
      }
  }

  function navigateContent(direction) {
      if (direction === "up") {
          currentIndex = (currentIndex + 1) % swipeContents.length;
      } else if (direction === "down") {
          currentIndex = (currentIndex - 1 + swipeContents.length) % swipeContents.length;
      }
      updateSwipeContent();
  }

  updateSwipeContent();

  container.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
  });

  container.addEventListener("touchmove", (e) => {
      e.preventDefault();
      touchMoveY = e.touches[0].clientY - touchStartY;
      const swipeContents = container.getElementsByClassName("swipe-content");

      for (const content of swipeContents) {
          const translateY = parseFloat(content.style.transform.match(/-?\d+/)[0]);
          const newTranslateY = translateY * 100 + touchMoveY;
          content.style.transform = `translateY(${newTranslateY}px)`;
          content.style.opacity = 1 - Math.abs(newTranslateY / container.offsetHeight);
      }
  });

  container.addEventListener("touchend", () => {
      if (touchMoveY > 100 && currentIndex > 0) {
          navigateContent("down");
      } else if (touchMoveY < -100 && currentIndex < swipeContents.length - 1) {
          navigateContent("up");
      } else {
          updateSwipeContent();
      }
  });
});
