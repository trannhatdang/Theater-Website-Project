const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const username = localStorage.getItem("loggedInUser");
const role = localStorage.getItem("userRole");

// Select the <ul> inside <nav>
const navList = document.querySelector("nav ul");

if (isLoggedIn) {
  // Remove Login and Sign Up items if they exist
  const loginLi = document.getElementById("loginBtn");
  const signupLi = document.getElementById("signupBtn");
  if (loginLi) loginLi.remove();
  if (signupLi) signupLi.remove();

  if (role === "employee") {
    // Employee → redirect to employee.html if not already there
    if (!window.location.href.includes("employee.html")) {
      window.location.href = "employee.html";
    }

    // Add welcome + logout
    const welcomeLi = document.createElement("li");
    welcomeLi.id = "welcomeMsg";
    welcomeLi.innerHTML = `<span>Welcome, ${username} (Employee)</span>`;

    const logoutLi = document.createElement("li");
    logoutLi.id = "logoutBtn";
    logoutLi.innerHTML = `<a href="#">Logout</a>`;

    navList.appendChild(welcomeLi);
    navList.appendChild(logoutLi);

  } else {
    // Customer → stay on theater.html, update nav
    const welcomeLi = document.createElement("li");
    welcomeLi.id = "welcomeMsg";
    welcomeLi.innerHTML = `<span>Welcome, ${username}</span>`;

    const logoutLi = document.createElement("li");
    logoutLi.id = "logoutBtn";
    logoutLi.innerHTML = `<a href="#">Logout</a>`;

    navList.appendChild(welcomeLi);
    navList.appendChild(logoutLi);
  }

  // Logout click handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userRole");
      window.location.href = "login.html";
    });
  }
}