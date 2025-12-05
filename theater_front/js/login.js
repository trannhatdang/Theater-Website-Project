document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Load users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Fallback: ensure admin exists (employee)
  if (!users.some(u => u.username === "admin")) {
    users.push({ username: "admin", password: "123456", role: "employee" });
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Find matching account
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Store login state
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", user.role || "customer"); // default to customer

    // Redirect based on role
    if (user.role === "employee") {
      window.location.href = "employee.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    document.getElementById("error").style.display = "block";
  }
});