import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export function createAccsessToken(sub, username, email) {
  const jti = crypto.randomBytes(10).toString("hex");
  return jwt.sign(
    { sub: sub, username: username, email: email, jti: jti },
    "xtrdtdytukykuyfuykfkuyflkykfyuf",
    {
      expiresIn: "1h",
    },
  );
}
export function createRefreshToken(sub, username, email) {
  const jti = crypto.randomBytes(10).toString("hex");
  return jwt.sign(
    { sub: sub, username: username, email: email, jti: jti },
    "xtrdtdytukykuyfuykfkuyevbrtbgtfflkykfyuf",
    {
      expiresIn: "1y",
    },
  );
}

export function verifyAccsessToken(accsessToken) {
  return jwt.verify(accsessToken, "xtrdtdytukykuyfuykfkuyflkykfyuf");
}
export function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, "xtrdtdytukykuyfuykfkuyevbrtbgtfflkykfyuf");
}
