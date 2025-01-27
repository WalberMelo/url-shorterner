# **URL Shortener Project**

A URL Shortener backend service built with **NestJS**, **Prisma**, and **MySQL**, designed to provide efficient URL shortening and storage. The project uses **Docker** for development and deployment.

---

## **Features**

- Shorten long URLs into slugs, unique short URLs.
- Retrieve a list of previously shortened URLs (history).
- Delete specific shortened URLs from the database.
- API ready for frontend integration.

---

## **Prerequisites**

To run this project, ensure you have the following installed:

- [Docker](https://www.docker.com/) (Docker Compose included)
- [Node.js](https://nodejs.org/) (only for local development, optional for Docker-based execution)

---

## **Setup Instructions**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2. Configure Environment Variables

Ensure the `DATABASE_URL` in `.env` matches the MySQL configuration.

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### **Testing the Endpoints**

Use **Postman**, **cURL**, or a similar API testing tool to test the API. Below are the main endpoints:

**Base URL**: `http://localhost:3333`

| **Method** | **Endpoint**   | **Description**              |
| ---------- | -------------- | ---------------------------- |
| POST       | `/url/create`  | Create a short URL           |
| GET        | `/url/history` | Get the history of URLs      |
| DELETE     | `/url/:id`     | Delete a short URL by its ID |
