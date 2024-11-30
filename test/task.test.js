const request = require("supertest");
const app = require("../app"); // Import your Express app

describe("Task Management API", () => {
  let server;

  beforeAll(() => {
    server = app.listen(5001); // Use a test-specific port
  });

  afterAll(() => {
    server.close(); // Ensure the server shuts down after tests
  });
  it("should create a new task", async () => {
    const token = "test-valid-token"; // Use a valid token or mock it
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
        priority: "medium",
        deadline: "2024-12-31",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("Test Task");
  });
});
