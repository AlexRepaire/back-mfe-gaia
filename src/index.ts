import cors from "cors";
import helmet from "helmet";
import express from "express";
import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { config } from "./config";
import UsersController from "./resources/users";
import AuthController from "./resources/auth";
import UnknownRoutesHandler from "./middlewares/unknownRoutes.handler";

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

app.use("/api/users", UsersController);
app.use("/api/auth", AuthController);

app.get("/api/", (req, res) => res.send("🏠"));

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all("*", UnknownRoutesHandler);

/**
 * Gestion des erreurs
 */
app.use(ExceptionsHandler);

app.listen(config.API_PORT, () => console.log("Silence, ça tourne."));
