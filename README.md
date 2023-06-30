# KunJonBook - Simplified Version of Facebook

## Description

KunJonBook is a simplified version of Facebook, designed to allow users to sign up and log in to read and write posts and chat with friends, similar to what can be done on common social networks. This project showcases the implementation of major technologies such as Apollo, Express.js, Node.js, Next.js, TypeORM, AWS ECS, and CircleCI.

## Technologies Used

- Apollo
- Express.js
- Node.js
- Next.js
- TypeORM
- AWS ECS
- CircleCI

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/KunJon-analytics/KunJonBook.git
```

2. Install dependencies:

   - Install `frontend` dependencies.

   ```bash
   cd KunJonBook/frontend
   npm install
   ```

   - Install `backend` dependencies.

   ```bash
   cd KunJonBook/backend
   npm install
   ```

3. Configure the backend:

   - Set up a PostgresSQL database and update the connection details in `backend/src/database/index.ts`.

4. Configure the frontend:

   - Update the Apollo client configuration in `frontend/config.js` to point to your backend's GraphQL endpoint.

5. Run the application:

```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend server
cd ../frontend
npm start
```

6. Open your browser and navigate to `http://localhost:3000` to access the KunJonBook application.

## Testing

To run the tests for components or functions, use the following command:

```bash
cd frontend
npm test
```

## Deployment

The deployment process is automated using CircleCI. It is configured to deploy the application to AWS ECS whenever changes are pushed to the `main` branch. The deployment configuration can be found in the `.circleci/config.yml` file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
