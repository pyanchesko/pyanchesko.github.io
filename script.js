document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const swipeContents = [
      { content: "Swipeable Content 1", backgroundColor: "red" },
      { content: "Swipeable Content 2", backgroundColor: "blue" },
      { content: "Swipeable Content 3", backgroundColor: "green" },
  ];

  let currentIndex = 0;

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
      container.appendChild(createSwipeContent(swipeContents[currentIndex].content, swipeContents[currentIndex].backgroundColor, 0));
      if (currentIndex > 0) {
          container.appendChild(createSwipeContent(swipeContents[currentIndex - 1].content, swipeContents[currentIndex - 1].backgroundColor, -100));
      }
      if (currentIndex < swipeContents.length - 1) {
          container.appendChild(createSwipeContent(swipeContents[currentIndex + 1].content, swipeContents[currentIndex + 1].backgroundColor, 100));
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

  const hammer = new Hammer(container);
  hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
  hammer.on("panmove", (e) => {
      const deltaY = e.deltaY;
      const swipeContents = container.getElementsByClassName("swipe-content");
      for (const content of swipeContents) {
          content.style.transform = `translateY(calc(${parseFloat(content.style.transform.match(/-?\d+/)[0])}% + ${deltaY}px))`;
      }
  });

  hammer.on("panend", (e) => {
      const deltaY = e.deltaY;
      if (deltaY > 100) {
          navigateContent("down");
      } else if (deltaY < -100) {
          navigateContent("up");
      } else {
          updateSwipeContent();
      }
  });
});
