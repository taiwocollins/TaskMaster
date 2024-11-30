# **TaskMaster**

**Capstone Project: 3MTT Software Engineering**

---

### **Project Overview**

TaskMaster is a comprehensive task management system designed to enhance productivity and organization. This full-stack web application enables users to create, update, delete, and filter tasks efficiently, offering features such as user authentication, task prioritization, and deadline management. The system is scalable, secure, and optimized for performance.

---

### **Features**

1. **User Registration and Authentication**

   - Secure user registration and login using **JWT** or sessions.
   - Password hashing with **bcrypt** for enhanced security.

2. **Task Management**

   - Create tasks with attributes: title, description, deadline, and priority (low, medium, high).
   - Update or delete tasks easily through an intuitive interface.

3. **Task Filtering**

   - Filter tasks by priority or due date for better organization.

4. **Search Functionality**

   - Search tasks based on keywords in the title or description.

5. **Asynchronous Operations**

   - Real-time task management using **AJAX** or Fetch API.

6. **Error Handling**
   - Robust error handling for client and server-side issues, including validation errors and server failures.

---

### **Technologies Used**

#### **Backend**

- **Node.js**: Backend logic.
- **Express.js**: RESTful API development.
- **bcrypt**: Password hashing.

#### **Database**

- **MongoDB** or **PostgreSQL**: Flexible database options for storing user and task information.

#### **Frontend**

- **HTML, CSS, and JavaScript**: For building a user-friendly interface.
- **AJAX/FETCH API**: Asynchronous communication with the backend.

#### **Deployment**

- **Backend**: Hosted on [Fly.io](https://fly.io).
- **Frontend**: Deployed on **Vercel** or **Netlify**.

---

### **Project Setup**

#### **1. Clone the Repository**

```bash
git clone https://github.com/olaniyihakeemboluwatife/TaskMaster.git
cd <your-repo>
```

#### **2. Install Dependencies**

- Backend:
  ```bash
  cd server
  npm install
  ```
- Frontend:
  ```bash
  cd client
  npm install
  ```

#### **3. Environment Variables**

Create a `.env` file in the `server` directory with the following values:

```env
PORT=5000
DB_URI=<your-database-connection-string>
JWT_SECRET=<your-jwt-secret>
```

#### **4. Run the App**

- Start the backend server:
  ```bash
  cd server
  npm start
  ```
- Start the frontend server:
  ```bash
  cd client
  npm start
  ```
  Access the app at `http://localhost:3000`.

#### **5. Deploy**

- Deploy the backend to [Fly.io](https://fly.io).
- Deploy the frontend to **Vercel** or **Netlify**.

---

### **Database Design**

**Users Table/Collection**:

- `id`: Unique identifier for the user.
- `username`: The user's name.
- `email`: User's email address.
- `password`: Hashed password.

**Tasks Table/Collection**:

- `id`: Unique identifier for the task.
- `user_id`: Identifier linking tasks to users.
- `title`: Task title.
- `description`: Detailed task description.
- `deadline`: Task due date.
- `priority`: Priority level (low, medium, high).

---

### **How to Use the App**

1. **User Registration**:
   - Sign up to create an account.
2. **Login**:
   - Log in using your registered email and password.
3. **Task Management**:
   - Add tasks with titles, descriptions, priorities, and deadlines.
   - Edit or delete tasks as needed.
4. **Filter and Search**:
   - Use filters to view tasks by priority or deadline.
   - Search tasks using keywords.

---

### **Testing**

- **Unit Tests**:  
  Write tests for user authentication, task creation, and filtering functionality using tools like Jest or Mocha.

---

### **Final Presentation**

- A **live demo** will showcase the app’s core functionalities.
- A **2-minute video** highlights how TaskMaster addresses task organization challenges.

---

### **Submission Requirements**

- **Live App Link**: [TaskMaster Live](https://task-master-three-gamma.vercel.app/login.html).
- **Code Repositories**: Backend and Frontend GitHub links.
- **Reports and Presentation**: Documentation and video links.

---

Feel free to contribute and enhance TaskMaster’s capabilities! 😊
