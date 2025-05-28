import { InputValue } from '@/store/textfieldStore';

export const validators = {
    //이메일 유효성 검사
    validateEmail: function (email: InputValue): {
        isValid: boolean;
        message: string;
    } {
        //이메일 정규식 통과후  -> DB에 중복 이메일 검사 후 통과
        const emailRegex =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        switch (emailRegex.test(email as string)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return {
                    isValid: false,
                    message: '이메일 형식이 올바르지 않습니다.',
                };
                break;
            // default:
        }
    },
    //닉네임 유효성 검사
    validateNickname: function (nickname: InputValue): {
        isValid: boolean;
        message: string;
    } {
        //한글 영어 대소문자 숫자 공백 포함 2~8자
        const nicknameRegex = /^[가-힣a-zA-Z0-9\s]{2,8}$/;
        /*
        정규식 통과 후 -> 중복 닉네임 검사 후 통과
        */
        switch (nicknameRegex.test(nickname as string)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return {
                    isValid: false,
                    message: '닉네임은 2~8자 이내로 입력해주세요.',
                };
                break;
            //default:
        }
    },
    //비밀번호 유효성 검사
    validatePassword: function (password: InputValue): {
        isValid: boolean;
        message: string;
    } {
        //최소 8자 ~ 16자, 최소 하나의 대문자 포함 및 소문자 포함 및 특수문자 포함
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        switch (passwordRegex.test(password as string)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return {
                    isValid: false,
                    message:
                        '대소문자, 특수문자를 포함하여 8~16자 이내로 입력해주세요.',
                };
                break;
        }
    },
    //이미지 유효성 검사
    validateImage: function (file: InputValue): {
        isValid: boolean;
        message: string;
    } {
        // File 객체가 아니면 에러
        if (!file || !(file instanceof File)) {
            return {
                isValid: false,
                message: '파일을 선택해주세요.',
            };
        }

        // 파일 사이즈 검사 (5MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024; // 5MB
        const fileSize = file.size;
        if (fileSize > maxSize) {
            return {
                isValid: false,
                message: `파일 크기가 너무 큽니다. (최대 ${maxSize / 1024 / 1024}MB)`,
            };
        }
        return {
            isValid: true,
            message: '파일이 유효합니다.',
        };
    },
    //넘버 타입 유효성 검사
    validateNumber: function (number: InputValue): {
        isValid: boolean;
        message: string;
    } {
        //숫자만 입력 가능 (지수표현 이런거 허용 X)
        const numberRegex = /^[0-9]+$/;
        switch (numberRegex.test(number as string)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return { isValid: false, message: '숫자만 입력해주세요.' };
                break;
        }
    },
};
