const db = require("../models");
const { hashPassword, decrypt } = require("./crypto");
const Session = db.session;
const User = db.user;

authenticate = async (req, res, require = true) => {
  let auth = req.get("authorization");
  console.log(auth);
  if (auth != null) {
    if (
      auth.startsWith("Basic ") &&
      (typeof require !== "string" || require === "credentials")
    ) {
      let credentials = auth.slice(6);
      credentials = Buffer.from(credentials, "base64").toString("utf8");
      let i = credentials.indexOf(":");
      let email = credentials.slice(0, i);
      let password = credentials.slice(i + 1);
      let user = {};
      await User.findAll({ where: { email: email } })
        .then((data) => {
          user = data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      if (user != null) {
        let hash = await hashPassword(password, user.salt);
        if (Buffer.compare(user.password, hash) !== 0) {
          return res.status(401).send({
            message: "Invalid password!",
          });
        }
        return {
          type: "credentials",
          userId: user.id,
        };
      } else {
        return res.status(401).send({
          message: "User not found!",
        });
      }
    }
    if (
      auth.startsWith("Bearer ") &&
      (typeof require !== "string" || require === "token")
    ) {
      let token = auth.slice(7);
      let sessionId = await decrypt(token);
      let session = {};
      await Session.findAll({ where: { id: sessionId } })
        .then((data) => {
          session = data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      if (session != null) {
        if (session.expiration_date >= Date.now()) {
          return {
            type: "token",
            userId: session.userId,
            sessionId: session.id,
          };
        } else {
          return res.status(401).send({
            message: "Session has expired.",
          });
        }
      } else {
        return res.status(401).send({
          message: "Invalid session",
        });
      }
    }
  }
  if (require) {
    return res.status(401).send({
      message: "Authentication required",
    });
  }
  return { type: "none", userId: null };
};

authenticateRoute = async (req, res, next) => {
  try {
    let auth = req.get("authorization");
    console.log(auth);
    if (auth != null) {
      if (
        auth.startsWith("Bearer ") &&
        (typeof require !== "string" || require === "token")
      ) {
        let token = auth.slice(7);
        let sessionId = await decrypt(token);
        let session = {};
        await Session.findAll({ where: { id: sessionId } })
          .then((data) => {
            session = data[0];
          })
          .catch((error) => {
            console.log(error);
          });
        if (session != null) {
          console.log("sess", session.expiration_date);
          console.log(session.expiration_date >= Date.now());
          console.log(Date.now());
          if (session.expiration_date >= Date.now()) {
            next();
            return;
          } else {
            return res.status(401).send({
              message: "Unauthorized! Expired Token, Logout and Login again",
            });
          }
        } else {
          return res.status(401).send({
            message: "Unauthorized! Expired Token, Logout and Login again",
          });
        }
      }
    } else {
      return res.status(401).send({
        message: "Unauthorized! No Auth Header",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(401).send({
      message:
        error.message?.message ||
        error.message ||
        "Error occured while verifying user!",
    });
  }
};

adminAuthenticateRoute = async (req, res, next) => {
  try {
    let auth = req.get("authorization");
    console.log(auth);
    if (auth != null) {
      if (
        auth.startsWith("Bearer ") &&
        (typeof require !== "string" || require === "token")
      ) {
        let token = auth.slice(7);
        let sessionId = await decrypt(token);
        let session = {};
        await Session.findAll({ where: { id: sessionId } })
          .then((data) => {
            session = data[0];
          })
          .catch((error) => {
            console.log(error);
          });
        if (session != null) {
          console.log("sess", session.expiration_date);
          console.log(session.expiration_date >= Date.now());
          console.log(Date.now());
          if (session.expiration_date >= Date.now()) {
            let user = {};
            await User.findAll({ where: { id: session.userId } })
              .then((data) => {
                user = data[0];
              })
              .catch((error) => {
                console.log(error);
              });

            if (user != null && user.is_admin) {
              next();
              return;
            } else {
              return res.status(403).send({
                message: "Forbidden! Admin access required",
              });
            }
          } else {
            return res.status(401).send({
              message: "Unauthorized! Expired Token, Logout and Login again",
            });
          }
        } else {
          return res.status(401).send({
            message: "Unauthorized! Expired Token, Logout and Login again",
          });
        }
      }
    } else {
      return res.status(401).send({
        message: "Unauthorized! No Auth Header",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(401).send({
      message:
        error.message?.message ||
        error.message ||
        "Error occured while verifying user!",
    });
  }
};

const auth = {
  authenticate: authenticate,
  authenticateRoute: authenticateRoute,
  adminAuthenticateRoute: adminAuthenticateRoute
};

module.exports = auth;
