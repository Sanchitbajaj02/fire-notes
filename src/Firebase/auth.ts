async function encodePassword(password: string) {
  try {
    if (typeof password !== "string") {
      throw new Error("Type mismatch: password must be a string");
    }

    if (password.length < 4 || password.length > 20) {
      throw new Error("Password must be between 4 and 20 characters");
    }

    // const salt = randomBytes(16).toString("hex");
    // const hashPassword = scryptSync(password, salt, 16).toString("hex");

    // const hashedPasswordWithSalt = `${salt}:${hashPassword}`;

    // return hashedPasswordWithSalt;

    // const salt: string = await genSalt(10);
    // if (salt) {
    //   const hashedPassword: string = await hash(password, salt);
    //   return hashedPassword;
    // }
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function decodePassword(password: string, hashedPassword: string) {
  try {
    if (typeof password !== "string") {
      throw new Error("Type mismatch: password must be a string");
    }
    // const [salt, key] = password.split(":");
    // const hashBuffer = scryptSync(password, salt, 64);

    // const keyBuffer = Buffer.from(key, "hex");
    // const match = timingSafeEqual(hashBuffer, keyBuffer);

    // return match ? true : false;

    // const match = await compare(password, hashedPassword);

    // if (match) {
    //   return true;
    // }
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

export { encodePassword, decodePassword };
