# My Next.js App

This is a Next.js application that can be run locally for development or containerized using Docker for production or testing.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Running the Application](#running-the-application)
  - [Run with Docker](#run-with-docker)
  - [Run Locally](#run-locally)
- [License](#license)

## Features

- Server-side rendered pages with Next.js.
- Fast refresh for local development.
- Easily containerized using Docker.

## Requirements

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-next-app.git
   cd your-next-app


Run with Docker
Build the Docker Image

From the project root, run:

docker build -t my-next-app .


Run the Docker Container

Once the image is built, run:

docker run -p 3000:3000 my-next-app

Your Next.js application will be accessible at http://localhost:3000.

Run Locally
Start the Application in Development Mode

Use the following command:

npm run dev

Access the Application

Open your browser and navigate to http://localhost:3000.

License
This project is licensed under the MIT License.