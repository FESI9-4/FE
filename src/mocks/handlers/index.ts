import {
    logoutHandlers,
    signupHandlers,
    userHandlers,
    refreshHandlers,
    testHandlers,
    testHandlers2,
} from './auths';

export const handlers = [
    ...logoutHandlers,
    ...signupHandlers,
    ...userHandlers,
    ...refreshHandlers,
    ...testHandlers,
    ...testHandlers2,
];
