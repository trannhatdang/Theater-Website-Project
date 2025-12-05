document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  const error = document.getElementById("signupError");
  const success = document.getElementById("signupSuccess");

  error.style.display = "none";
  success.style.display = "none";

  if (!username || !password) {
    error.textContent = "All fields are required.";
    error.style.display = "block";
    return;
  }

  if (password !== confirm) {
    error.textContent = "Passwords do not match.";
    error.style.display = "block";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(user => user.username === username);
  if (exists) {
    error.textContent = "Username already taken.";
    error.style.display = "block";
    return;
  }

  // Save new user
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  success.textContent = "Account created successfully! Redirecting...";
  success.style.display = "block";

  // Redirect to login page after 1–2 seconds
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});