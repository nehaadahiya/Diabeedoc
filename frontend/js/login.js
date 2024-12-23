document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Both fields are required. Please fill in all fields.");
      return;
    }

    if (username === "admin" && password === "password123") {
      alert("Login successful! Redirecting to your dashboard...");
      window.location.href = "dashboard.html"; // Example redirection
    } else {
      alert("Invalid username or password. Please try again.");
      document.getElementById("password").value = ""; // Clear password field
    }
  });
