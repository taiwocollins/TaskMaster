function checkSession() {
  const token = localStorage.getItem("token");

  if (!token) {
    // alert("Session expired. Redirecting to login...");
    redirectToLogin();
    return;
  }

  // Decode the token to extract its expiration time
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodes the base64 payload
  const expiration = decodedPayload.exp * 5000; // JWT `exp` is in seconds, convert to milliseconds

  // Check if the token is expired
  // if (Date.now() >= expiration) {
  //   alert("Session expired. Redirecting to login...");
  //   localStorage.removeItem("token"); // Clear token
  //   redirectToLogin();
  // }
}

function redirectToLogin() {
  window.location.href = "login.html";
}

// Run session check on page load
checkSession();

// Optional: Recheck every minute
setInterval(checkSession, 60000);
