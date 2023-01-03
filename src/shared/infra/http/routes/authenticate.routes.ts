import { Router } from "express";
import { AuthenticateUserCrontroller } from "@modules/accounts/useCases/authenticationUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserCrontroller = new AuthenticateUserCrontroller();

authenticateRoutes.post("/sessions", authenticateUserCrontroller.handle);

export { authenticateRoutes };
