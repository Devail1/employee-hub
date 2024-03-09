# Employee Hub

![Employee Hub Screenshot](https://res.cloudinary.com/di41jhirl/image/upload/v1709955911/cf0lj7w5pgunk4dtivhg.png)

Employee Hub is an app for employee status management.

Check out the live [demo](https://employee-hub.onrender.com/) of Employee Hub.

##### Please note, demo is hosted on a free tier which can delay initial load time.

## Features

- React app using vite.
- Server side using node and express.
- Employees CRUD using REST and RTK.
- Image upload utilizing Cloudinary SDK.
- PosgreSQL database hosted on Supabase, integrated with Prisma ORM.

## Prerequisites

- Node.js (version 18 or later): [https://nodejs.org/en/download](https://nodejs.org/en/download)
- **pnpm** (package manager): [https://pnpm.io/installation](https://pnpm.io/installation)

## Installation

Navigate into the project folder:

```bash
cd employee-hub
```

Use the package manager [pnpm](https://pnpm.io/installation) to install node modules dependecies.

```bash
pnpm install
```

## Usage

Copy the `.env` file into the project's root directory.

### Running in development

To run the project in development mode, use the following command:

```bash
pnpm run dev

# Access the project at http://localhost:3000 in your web browser.
```

### Running in production

In order to run the project in production mode, we first need to build the client side application:

```bash
cd client
pnpm install
pnpm build
```

Navigate back to the project's root folder:

```bash
cd ..
```

Start the node server:

```bash
pnpm run start

# Access the project at http://localhost:3000 in your web browser.
```
