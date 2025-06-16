import {
    logoutHandlers,
    signupHandlers,
    userHandlers,
    testHandlers,
    testHandlers2,
} from './auths';

export const handlers = [
    ...logoutHandlers,
    ...signupHandlers,
    ...userHandlers,
    ...testHandlers,
    ...testHandlers2,
];
