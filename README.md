# GraphQL Ava Mini

A simple GraphQL server built with **Apollo Server**, **Express**, and **JWT authentication**.  
This project demonstrates how to structure a GraphQL backend with modules like **User**, **Week**, **Card**, and **Session**.

## 🚀 Getting Started

### 1. Clone & Install

```bash
cd node-graphql-exercise
npm install
```

### 2. Run the Server

```bash
npm run dev
```

The server starts at:  
👉 `http://localhost:4000/graphql`

---

## 🔑 Authentication

This project uses **JWT tokens** for authentication.  
To test queries, add a header in Apollo Sandbox / Playground:

```json
{
  "Authorization": "Bearer <your_token>"
}
```

> Example fake token is generated in `auth.js` with `sub: "u1"`.

---

## 📌 Example Queries & Mutations

### Get All Users

```graphql
query {
  users {
    id
    name
    email
    phone
  }
}
```

### Get Weeks by User

```graphql
query {
  weeksByUser(userId: "u1") {
    id
    title
    startDate
  }
}
```

### Create Card

```graphql
mutation {
  createCard(input: { weekId: "w1", title: "New Task", minutes: 90 }) {
    id
    title
    minutes
    status
  }
}
```

### Update Card

```graphql
mutation {
  updateCard(id: "c1", input: { status: DONE }) {
    id
    title
    status
  }
}
```

### Ava Insights

```graphql
query {
  avaInsights(weekId: "w1") {
    totalMinutes
    doneCount
    focusScore
    recommendations
  }
}
```

### Sessions by User

```graphql
query {
  sessionsByUser(userId: "u1") {
    id
    durationMinutes
    createdAt
  }
}
```

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **Apollo Server**
- **GraphQL**
- **JWT Authentication**

---

## 📖 Notes

- `seed.json` contains sample in-memory data (no real DB).
- For production, you can connect services to a database (MongoDB).
- Modular schema allows easy scaling .

---
