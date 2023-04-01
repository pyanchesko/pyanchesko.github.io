document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const swipeContents = [
      { content: "Swipeable Content 1", backgroundColor: "red" },
      { content: "Swipeable Content 2", backgroundColor: "blue" },
      { content: "Swipeable Content 3", backgroundColor: "green" },
  ];

  let currentIndex = 0;

  function createSwipeContent(content, backgroundColor) {
      const swipeContent = document.createElement("div");
      swipeContent.classList.add("swipe-content");
      swipeContent.textContent = content;
      swipeContent.style.backgroundColor = backgroundColor;
      return swipeContent;
  }

  function updateSwipeContent() {
      container.innerHTML = "";
      container.appendChild(createSwipeContent(swipeContents[currentIndex].content, swipeContents[currentIndex].backgroundColor));
  }

  function navigateContent(direction) {
      if (direction === "left") {
          currentIndex = (currentIndex - 1 + swipeContents.length) % swipeContents.length;
      } else if (direction === "right") {
          currentIndex = (currentIndex + 1) % swipeContents.length;
      }
      updateSwipeContent();
  }

  updateSwipeContent();

  const hammer = new Hammer(container);
  hammer.on("swipeleft", () => navigateContent("left"));
  hammer.on("swiperight", () => navigateContent("right"));
});
