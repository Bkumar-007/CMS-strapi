Strapi Blog Application
========================

This is a blog application built using Strapi as the backend and Next.js as the frontend. 
The application implements JWT-based authentication and role-based access control (RBAC) to restrict access to articles based on user gender.

-----------------------------------------------------

🚀 Features:

- User Authentication:
  - Users can sign up and log in using JWT-based authentication.
  - Protected routes ensure that only authenticated users can access certain blogs.

- Role-Based Access Control (RBAC):
  - Some articles are publicly accessible.
  - Female users can access all blogs.
  - Other users can only access selected blogs based on the 'gender' field in the article collection.

- Strapi as Headless CMS:
  - Backend powered by Strapi with collections for managing blogs and users.
  - Uses Strapi’s API to fetch blog data dynamically.

-----------------------------------------------------

🛠 Tech Stack:

- Backend: Strapi (Headless CMS)
- Frontend: Next.js
- Database: SQLite (default) / PostgreSQL / MySQL
- Authentication: JWT-based authentication

-----------------------------------------------------

📦 Installation & Setup:

🔹 Prerequisites:
Ensure you have the following installed on your system:
- Node.js (Recommended version: >=16.x)
- Yarn or npm
- Strapi CLI (npx create-strapi-app)

🔹 Backend Setup (Strapi):
1. Clone the repository:

   cd strapi-blog-app

1. Install dependencies:
   npm install  # or yarn install

2. Start Strapi server:
   npm run develop  # or yarn develop

🔹 Frontend Setup (Next.js):
1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install  # or yarn install

3. Start the Next.js app:
   npm run dev  # or yarn dev
  

-----------------------------------------------------

🔐 Role-Based Access Implementation:

1. Adding a Gender Field in Articles:
   - The 'article' collection in Strapi contains a 'gender' field.
   - If gender = female, the article is visible to all users.
   - If gender = male, the article is restricted to selected users.

2. JWT Authentication:
   - Users receive a JWT token upon logging in.
   - The token is stored in localStorage or cookies for authentication.
   - API requests include the token in the 'Authorization' header.

3. API Routes:
   Route              | Method | Access           | Description
   ------------------ | ------ | --------------- | -------------------
   /auth/local       | POST   | Public          | User login  
   /articles        | GET    | Authenticated Users | Fetch articles  
   /users/me        | GET    | Authenticated Users | Get user details  

-----------------------------------------------------

🛠 Future Enhancements:

- Implement role-based admin access.
- Improve UI for restricted articles.
- Add comments and likes functionality.

-----------------------------------------------------
