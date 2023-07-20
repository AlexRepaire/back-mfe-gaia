import cors from "cors";
import helmet from "helmet";
import express from "express";
import { UnknownRoutesHandler } from "./middlewares/unknownRoutes.handler";
import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { config } from "./config";
import UsersController from "./resources/users";
import AuthController from "./resources/auth";

const app = express();

app.use(express.json());

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
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
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler);

app.listen(config.API_PORT, () => console.log("Silence, ça tourne."));
