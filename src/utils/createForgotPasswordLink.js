import User from "../model/Users";
import { v4 } from "uuid";
import { FORGOT_PASSWORD_PRT_ID } from "../model/Users/usersPID";
import { createForgotPasswordToken } from "../utils/Token";

export const createForgotPasswordLink = async (url, userId, database) => {
  const id = v4();
  const data = {
    database,
    userId,
    id,
  };
  const token = createForgotPasswordToken(data);
  try {
    await User.storeForgotPasswordLink(data, FORGOT_PASSWORD_PRT_ID);
  } catch (err) {
    return err;
  }
  return `${url}/new-password/${token}`;
};
