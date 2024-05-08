# Course Selling App Backend API

Welcome to the Course Selling App Backend API! This project serves as the backend for a course selling application. It's built using Node.js, Express.js, MongoDB, Mongoose, JWT, and Zod for validation.

## Getting Started

To get started with the API, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Set up your MongoDB database and update the connection string in the `.env` file.
4. Create a `.env` file based on the provided `.env.example` file and configure your environment variables.
5. Start the server by running `npm start`.
6. You can now access the API endpoints through `http://localhost:PORT`, where `PORT` is the port specified in your `.env` file.

## API Endpoints

The following endpoints are available in this API:

- `GET /api/courses`: Retrieve all courses.
- `POST /api/courses`: Create a new course.
- `GET /api/courses/:id`: Retrieve a specific course by ID.
- `PUT /api/courses/:id`: Update a course by ID.
- `DELETE /api/courses/:id`: Delete a course by ID.

Make sure to check the documentation or the code for detailed information on request and response formats for each endpoint.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected routes, you'll need to include a valid JWT token in the Authorization header of your requests. You can obtain a token by authenticating with the appropriate credentials.

## Error Handling

The API provides consistent error responses in JSON format. Errors are categorized by their HTTP status codes, and additional information may be included in the response body to help diagnose the issue.

## Validation

Input data is validated using Zod, a TypeScript-first schema declaration and validation library. This ensures that the data sent to the API meets the specified requirements, improving security and reliability.

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request with your changes. Make sure to follow the existing code style and conventions, and include relevant tests if applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
