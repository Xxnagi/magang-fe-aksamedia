# Aksa Library

Aksa Library is a web application built with Vite and Tailwind CSS. It is designed to allow users to manage data via a CRUD interface, with no backend API. All functionalities like authentication, data management, and theme switching are handled locally.

## Features

- **Authentication (Login)**: 
  - Login functionality without an API (username and password are static).
  - No registration functionality.
  - The username of the logged-in user is displayed in the navbar (top-right corner).
  - The user is able to log out from the application.
  - After logging in, the user stays authenticated until manually logged out, even after a page refresh.

- **CRUD Operations (without API)**:
  - Manage data using Local Storage or IndexedDB.
  - Search and filter data in the CRUD interface.
  - Pagination is implemented without using third-party libraries.
  - The page maintains its state (pagination and search/filter) when refreshed, using query strings to preserve the current page and search term.

- **Navbar**:
  - The navbar displays the logged-in user's name (top-right corner).
  - The dropdown in the navbar includes a logout button (dropdown created without using any UI library).
  
- **Authentication Guard**:
  - All pages except the login page require authentication to access.

- **Theme Switching**:
  - The application supports dark mode, light mode, and auto (follow the OS settings).
  - The default theme follows the system's theme preference.
  - If the theme is changed on the OS, the app will automatically switch to match the OS setting.

- **User Profile**:
  - A page is available to edit the logged-in user's full name. 
  - When the name is changed, it is automatically reflected in the navbar.
  - The new name persists even after a page refresh.

## Setup

### Prerequisites

Ensure that you have Node.js and npm installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/aksa-library.git
   ```

2. Install dependencies:

   ```bash
   cd aksa-library
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`.

### Production Build

To build the application for production:

```bash
npm run build
```

### Running Tests

If you have set up tests, run them with:

```bash
npm run test
```

## Technologies Used

- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Local Storage / IndexedDB**: For storing data locally without an API.

## License

This project is licensed under the MIT License.

---

Feel free to contribute to this project by opening issues or submitting pull requests.
