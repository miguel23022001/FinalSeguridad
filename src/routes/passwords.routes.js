import { Router } from "express";
import {
  createPassword,
  deletePassword,
  getPassword,
  getPasswords,
  updatePassword,
} from "../controllers/passwords.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPasswordSchema } from "../schemas/password.schema.js";

const router = Router();

router.get("/passwords", auth, getPasswords);

router.post("/passwords", auth, validateSchema(createPasswordSchema), createPassword);

router.get("/passwords/:id", auth, getPassword);

router.put("/passwords/:id", auth, updatePassword);

router.delete("/passwords/:id", auth, deletePassword);

export default router;