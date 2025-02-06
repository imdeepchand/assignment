# Node.js App with MongoDB

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Run with Docker](#run-with-docker)
  - [Run Locally](#run-locally)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Connects to a MongoDB database using Mongoose.
- Configurable environment variables for server port, database name, and MongoDB URI.
- Can be run both locally and within Docker containers.

## Requirements

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/imdeepchand/assignment.git
   cd assignment

Install Dependencies

npm install


Create a .env File

SERVERPORT=5000
DATABASENAME=Assigment
MONGODBURI=mongodb://mongo:27017/


Environment Variables
SERVERPORT: The port on which the server runs (default is 5000).
DATABASENAME: The name of the MongoDB database (default is Assigment).
MONGODBURI: The connection string for MongoDB (default is mongodb://mongo:27017/ when using Docker).

Running the Application
Run with Docker
Build and Start the Containers

From the project root, run:

docker-compose up --build

Access the Application

The Node.js app will be available at http://localhost:5000.

Run Locally
Ensure MongoDB is Running

Make sure you have a MongoDB instance running locally. If needed, update the MONGODBURI in your .env file (e.g., mongodb://localhost:27017/Assigment).

Start the Application

npm run start

Access the Application

Open your browser and navigate to http://localhost:5000.

API Endpoints
GET /
Returns a simple JSON message confirming that the API is working.

Additional Endpoints:
Extend the application with additional routes as needed.

License
This project is licensed under the MIT License.
