import { LoginRequestDto, SignupMemberRequestDto } from './auth';

export type SignupFormData = SignupMemberRequestDto & {
    passwordCheck: string;
};
export type LoginFormData = LoginRequestDto;
