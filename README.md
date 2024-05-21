# Repair Ninja's Front End 🥷

## What's this?

This project is a front-end web application built using the React library for the [Repair Ninja's API](https://github.com/alireza1219/repair-ninja).

# Development Setup Guide 🧑‍💻

## Running with Docker Compose 🐋

First, you'll need to create a `.env` file in the project root directory with the following environment variable:

```
# The RepairNinja's base API address.
VITE_REPAIR_NINJA_ENDPOINT="http://127.0.0.1:8000/"
```

Then, to run the project using Docker Compose, navigate to the project root directory and execute the following command:

```
docker compose -f docker-compose-dev.yaml up
```

Alternatively, you can use the following npm commands as well:

```
npm run docker-dev-up    # Create and start the container
npm run docker-dev-down  # Stop and remove the container.
npm run docker-dev-start # Start the container.
npm run docker-dev-stop  # Stop the container.
```

Once the Docker container is up, open your web browser and navigate to http://localhost:5173 to view the project.

**Note: Changes made outside the /src directory are not visible in the Docker container.**

## Running with npm 📦

To run the project using npm, follow these steps:

First, install project dependencies using npm by executing the following command:

```
npm install
```

Then, create a `.env` file in the project root directory with the following environment variable:

```
# The RepairNinja's base API address.
VITE_REPAIR_NINJA_ENDPOINT="http://127.0.0.1:8000/"
```

You can now run the project by executing the following command:

```
npm run dev
```
