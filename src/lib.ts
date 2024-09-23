// src/lib.ts
import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    ?.setProtectedHeader({ alg: "HS256" })
    ?.setIssuedAt()
    ?.setExpirationTime("10 sec from now")
    ?.sign(key);
};

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload;
};
