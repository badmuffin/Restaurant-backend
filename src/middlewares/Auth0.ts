import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: "https://myfirstapi.example.com", // Your API Audience
  issuerBaseURL: "https://dev-aeeksg6c302ra27e.us.auth0.com/",
  tokenSigningAlg: "RS256", // Algorithm used for signing tokens
});

