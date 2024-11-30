function verifyAccess() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in to access this page.");
    redirectToLogin();
    return;
  }

  // Optional: Decode token and validate expiration
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  const expiration = decodedPayload.exp * 1000;

  // if (Date.now() >= expiration) {
  //   alert("Session expired. Redirecting to login...");
  //   localStorage.removeItem("token");
  //   redirectToLogin();
  // }
}

verifyAccess();
