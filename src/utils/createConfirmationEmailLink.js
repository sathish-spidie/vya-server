import User from "../model/Users";
import { v4 } from "uuid";
import { CONFIRMATION_EMAIL_PRT_ID } from "../model/Users/usersPID";
import { createConfirmationEamilToken } from "../utils/Token";

export const createConfirmationEamilLink = async (url, userId, database) => {
  const id = v4();
  const data = {
    id,
    userId,
    database,
  };
  const token = createConfirmationEamilToken(data);
  try {
    await User.storeConfirmEmailLink(data, CONFIRMATION_EMAIL_PRT_ID);
  } catch (err) {
    return err;
  }
  return `${url}/confirm-email/${token}`;
};
