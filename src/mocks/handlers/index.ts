import {
    loginHandlers,
    logoutHandlers,
    signupHandlers,
    userHandlers,
    refreshHandlers,
} from './auths';

export const handlers = [
    ...loginHandlers,
    ...logoutHandlers,
    ...signupHandlers,
    ...userHandlers,
    ...refreshHandlers,
];
