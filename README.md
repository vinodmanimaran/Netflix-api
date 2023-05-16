# Netflix-Backend


This is the backend API for a Netflix clone application. It provides the server-side functionality for user authentication, movie management, user lists, and more. It is built with Node.js, Express.js, and MongoDB.

Features
-User authentication and authorization
-User management (registration, login, profile)
-Movie management (CRUD operations)
-User lists (create, delete, retrieve)
-Token-based authentication using JSON Web Tokens (JWT)

Prerequisites
Before running the API locally, ensure that you have the following prerequisites installed:
-Node.js (v12 or higher)
-MongoDB

API Endpoints
The following API endpoints are available:
-POST /api/auth/register: Register a new user.
-POST /api/auth/login: Log in an existing user.
-GET /api/users/:id: Get user information by ID.
-PUT /api/users/:id: Update user information by ID.
-DELETE /api/users/:id: Delete a user by ID.
-POST /api/movies: Create a new movie.
-PUT /api/movies/:id: Update a movie by ID.
-DELETE /api/movies/:id: Delete a movie by ID.
-GET /api/movies/:id: Get a movie by ID.
-GET /api/movies: Get all movies.
-GET /api/movies/random: Get a random movie.
-POST /api/movielist: Create a new user list.
-DELETE /api/movielist/:id: Delete a user list by ID.
-GET /api/movielist/:id: Get a user list by ID.
-GET /api/movielist: Get all user lists.

Please refer to the API code and documentation for detailed information about request/response formats and parameters.


Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

License
This project is licensed under the MIT License.

Acknowledgements
This API is built as part of a larger project to replicate the core features of Netflix. Special thanks to the developers and contributors of the libraries and frameworks used in this project.
