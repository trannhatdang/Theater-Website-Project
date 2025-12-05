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