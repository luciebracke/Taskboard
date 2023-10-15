const connectDB = require('../config/db');
const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");
const serverhttp = require("../server");

require("dotenv").config();

// Opening database connection before each test.
beforeEach(async () => {
  connectDB();
});

// Closing database connection after all tests.
// Closing the server after all tests or jest will run indefinitely
afterAll(() => {
  mongoose.connection.close();
  serverhttp.quit();
});

let idForTesting;
let userEmailTest;
let updatedEmail;

describe("POST /api/users/register", () => {
  
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: "email.test@email.com",
        password: "password"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id", "email", "password");
    idForTesting = res.body._id;
    userEmailTest = res.body.email;
  });

  it("should not create a new user when the email is already in use by another user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: "email.test@email.com",
        password: "password"
      });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("An account with this email already exists!");
  });

  it("should not create a new user when the password is too short", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: "another.email.@email.com",
        password: "pass"
      });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Password must have at least 6 characters!");
  });
});

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("PATCH /api/users/:id", () => {
  it("should update a user", async () => {
    const res = await request(app)
      .patch(`/api/users/${idForTesting}`)
      .send({
        email: "updated.email@email.com"
      });
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    expect(res.body.email).toBe("updated.email@email.com");
    updatedEmail = res.body.email;
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const res = await request(app).delete(`/api/users/${idForTesting}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`The user using the email ${updatedEmail} has been deleted`);
  });
});