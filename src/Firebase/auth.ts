import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function encodePassword(password: string) {
  try {
    if (typeof password !== "string") {
      throw new Error("Type mismatch: password must be a string");
    }

    if (password.length < 4 || password.length > 20) {
      throw new Error("Password must be between 4 and 20 characters");
    }

    const salt = randomBytes(16).toString("hex");
    const hashPassword = scryptSync(password, salt, 16).toString("hex");

    const hashedPasswordWithSalt = `${salt}:${hashPassword}`;

    return hashedPasswordWithSalt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function decodePassword(password: string) {
  try {
    const [salt, key] = password.split(":");
    const hashBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashBuffer, keyBuffer);

    return match ? true : false;
  } catch (error) {
    console.log(error);
  }
}

export { encodePassword, decodePassword };
