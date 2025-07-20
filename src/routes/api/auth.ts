import passport from "passport";
import { Router } from "express";
import UserController from "../../controllers/user";

const authRoute = Router();
const {login} = UserController



 authRoute.post("/login", login);


authRoute.get(
  "/:provider",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/:provider/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send(`Hello ${(req as any).user.displayName}`             );
  }
);

export default authRoute;