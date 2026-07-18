import { auth } from './src/auth/auth';

async function createAdmin() {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@school.com",
        password: "password123",
        name: "Admin",
      },
    });
    console.log("Admin user created:", user);
  } catch (error) {
    console.error("Failed to create admin:", error);
  }
  process.exit(0);
}

createAdmin();
