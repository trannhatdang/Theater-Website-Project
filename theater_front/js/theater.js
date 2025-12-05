function slideLeft() {
  document.querySelector("#now-showing .movie-grid")
    .scrollBy({ left: -300, behavior: "smooth" });
}

function slideRight() {
  document.querySelector("#now-showing .movie-grid")
    .scrollBy({ left: 300, behavior: "smooth" });
}

function slideLeftComing() {
  document.querySelector("#coming-soon .movie-grid")
    .scrollBy({ left: -300, behavior: "smooth" });
}

function slideRightComing() {
  document.querySelector("#coming-soon .movie-grid")
    .scrollBy({ left: 300, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const movieTitle = button.getAttribute("data-movie-title");

      if (!isLoggedIn) {
        window.location.href = "login.html";
      } else {
        window.location.href = `book.html?movie=${encodeURIComponent(movieTitle)}`;
      }
    });
  });
});