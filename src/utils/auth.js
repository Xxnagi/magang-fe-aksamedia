const CREDENTIALS = {
  username: "admin",
  password: "admin123",
  fullName: "Admin User",
};

export function login(username, password) {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    // Simpan data pengguna di local storage
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
  // Tandai status pengguna sebagai logout
  localStorage.removeItem("isLoggedIn");
}
