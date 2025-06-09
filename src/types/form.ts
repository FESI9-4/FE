import { LoginRequest, SignupRequest } from './auth';

export type SignupFormData = SignupRequest & {
    passwordCheck: string;
};
export type LoginFormData = LoginRequest;
