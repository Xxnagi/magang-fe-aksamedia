const CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export function login(username, password) {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    localStorage.setItem("user", JSON.stringify({ username }));
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return !!localStorage.getItem("user");
}

export function logout() {
  localStorage.removeItem("user");
}
