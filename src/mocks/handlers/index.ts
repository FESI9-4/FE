import {
    logoutHandlers,
    signupHandlers,
    userHandlers,
    refreshHandlers,
    loginHandlers,
    findPasswordHandlers,
} from './auths';
export const authHandlers = [
    ...loginHandlers,
    ...logoutHandlers,
    ...signupHandlers,
    ...userHandlers,
    ...refreshHandlers,
    ...findPasswordHandlers,
];
