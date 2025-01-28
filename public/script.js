document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});
