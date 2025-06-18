import {
    logoutHandlers,
    signupHandlers,
    userHandlers,
    refreshHandlers,
    loginHandlers,
} from './auths';
export const authHandlers = [
    ...loginHandlers,
    ...logoutHandlers,
    ...signupHandlers,
    ...userHandlers,
    ...refreshHandlers,
];
