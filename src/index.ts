import app from "./app";
import { connectToDB } from "./config/db.config";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during initialization:", err.message);
    process.exit(1); // Exit the process on failure
  });
