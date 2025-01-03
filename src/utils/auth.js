const CREDENTIALS = {
  username: "admin",
  password: "admin123",
  fullName: "Admin User",
};

export function login(username, password) {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    localStorage.setItem("user", JSON.stringify(CREDENTIALS));
    localStorage.setItem("isLoggedIn", "true");
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

export function logout() {
  localStorage.removeItem("isLoggedIn");
}
