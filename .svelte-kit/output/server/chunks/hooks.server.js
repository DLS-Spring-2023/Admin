import { A as Auth } from "./auth.js";
const handle = async ({ event, resolve }) => {
  event.locals.authenticated = await Auth.verifyUser(event);
  return resolve(event);
};
export {
  handle
};
