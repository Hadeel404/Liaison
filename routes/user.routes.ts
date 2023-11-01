import express from "express";
import { validateUser } from "../middlewares/validation/user.validateion.js";
import { login, register, updateUser } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/Auth/Authenticate.js";
import { User } from "../database/entities/User.model.js";
import { Role } from "../database/entities/Role.model.js";
import { Permission } from "../database/entities/Permission.model.js";

var router = express.Router();

router.post("/register", validateUser, async (req, res) => {
  register(req.body)
    .then(() => {
      res.status(201).send("user created");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error");
    });
});

router.put("/profile", authenticate, async (req, res) => {
  if (res.locals.user) {
    updateUser(res.locals.user, req.body)
      .then(() => {
        res.status(200).send(req.body);
      })
      .catch(() => {
        res.status(500).send("internel Error");
      });
  } else {
    res.status(404).send("not found");
  }
});

router.get("/profile", authenticate, async (req, res) => {
  const profile = res.locals?.user;
  if (profile) {
    res.status(200).send(profile);
  } else {
    res.status(404).send("not found");
  }
});

router.get("/roles", authenticate, async (req, res) => {
  const profile = res.locals?.user;
  if (profile) {
    res.status(200).send(profile?.roles);
  } else {
    res.status(404).send("not found");
  }
});
router.get("/permissions/list", authenticate, async (req, res) => {
  const profile = res.locals?.user;
  if (profile) {
    const permissions = profile?.roles?.reduce((acc: any, cur: any) => {
      acc[cur.roleName] = cur.permissions?.map(
        (permission: { permissionName: string }) => permission.permissionName
      );
      return acc;
    }, {});
    res.status(200).send(permissions);
  } else {
    res.status(404).send("not found");
  }
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  login(email, password)
    .then((data) => {
      res.cookie("firstName", data.firstName, {
        maxAge: 60 * 60 * 1000,
      });
      res.cookie("loginTime", Date.now(), {
        maxAge: 60 * 60 * 1000,
      });
      res.cookie("token", data.token, {
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.send({token: data.token});
    })
    .catch((err) => {
      next({
        code: "INVALID_CREDENTIALS",
        message: err,
      });
    });
});

router.post("/logout", (req, res) => {
  res.cookie("firstName", "", {
    maxAge: -1,
  });
  res.cookie("loginTime", "", {
    maxAge: -1,
  });

  res.cookie("token", "", {
    maxAge: -1,
  });

  res.send();
});

router.post("/permission/create", authenticate, async (req, res) => {
  if (!req.body.permissionName || !req.body.RoleName) {
    res.status(404).send(" permissionName & RoleName is required");
    return;
  }

  const newPermission = new Permission();
  newPermission.permissionName = req.body.permissionName;
  const newRole = await Role.findOneBy({
    roleName: req.body.RoleName,
  });
  if (newRole) {
    newRole.permissions = [...newRole.permissions, newPermission];
    console.log(newRole);
    newRole
      .save()
      .then((response) => {
        res.status(201).send("Permission created");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("error");
      });
  }
});

export default router;
