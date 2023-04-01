const swipeContainer = document.querySelector('.swipe-container');
const swipeContent = document.querySelector('.swipe-content');
const swipeItems = document.querySelectorAll('.swipe-item');

let currentSlide = 0;
let startX;
let startY;
let distX;
let distY;
let threshold = 50; // minimum distance to trigger swipe
let itemWidth = swipeContainer.clientWidth / swipeItems.length;

swipeContent.style.width = `${swipeItems.length * 100}%`;

for (let i = 0; i < swipeItems.length; i++) {
  swipeItems[i].style.width = `${itemWidth}px`;
}

swipeContainer.addEventListener('touchstart', handleTouchStart);
swipeContainer.addEventListener('touchmove', handleTouchMove);
swipeContainer.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  console.log("touchstart");
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  console.log("touchmove");
  distX = event.touches[0].clientX - startX;
  distY = event.touches[0].clientY - startY;

  if (Math.abs(distX) > Math.abs(distY)) {
    event.preventDefault();
    swipeContent.style.transform = `translateX(-${currentSlide * itemWidth}px) translateX(${distX}px)`;
  }
}

function handleTouchEnd(event) {
  console.log("touchend");
  if (Math.abs(distX) > threshold) {
    if (distX > 0 && currentSlide > 0) {
      currentSlide--;
    } else if (distX < 0 && currentSlide < swipeItems.length - 1) {
      currentSlide++;
    }
  console.log(currentSlide);
  }

  swipeContent.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
  startX = null;
  startY = null;
  distX = null;
  distY = null;
}
