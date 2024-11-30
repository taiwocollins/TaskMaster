const request = require("supertest");
const app = require("../app");

let server;

beforeAll(() => {
  server = app.listen(5001); // Use a test-specific port
});

afterAll(() => {
  server.close(); // Ensure the server shuts down after tests
});

describe("User Authentication API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/user/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
