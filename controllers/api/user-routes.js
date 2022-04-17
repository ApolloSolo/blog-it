const {User} = require("../../models/");

const router = require("express").Router();
//const { User } = require("../../models/index");

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found by that id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then((userData) => {
        if(!userData) {
            res.status(404).json({ message: "User email not found" })
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        res.json({ user: userData, message: "You have logged in!" })
    })
})

router.put("/:id", (req, res) => {
  User.update(req.body, {
      individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user of such id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;