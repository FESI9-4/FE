export const validators = {
    //이메일 유효성 검사
    validateEmail: function (email: string): {
        isValid: boolean;
        message: string;
    } {
        /*   ^ / $ : 입력 시작과 종료
        [0-9a-zA-Z] : 숫자, 영어소문자, 영어대문자 포함 
        ([-_.]?[0-9a-zA-Z])*- [-_.]? : '-_.' 특수문자는 없거나 하나만 포함 가능
        *@ :무조건 골뱅이 포함
        .[a-zA-Z]{2,3} : . 다음에 영어소문자와 영어대문자가 2개 or 3개 가능
        /i : 대소문자 구분 X
         */

        //이메일 정규식 통과후  -> DB에 중복 이메일 검사 후 통과
        const emailRegex =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        switch (emailRegex.test(email)) {
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
    validateNickname: function (nickname: string): {
        isValid: boolean;
        message: string;
    } {
        //한글 영어 대소문자 숫자 공백 포함 2~8자
        const nicknameRegex = /^[가-힣a-zA-Z0-9\s]{2,8}$/;
        /*
        비속어필터 같은걸 활용하면 좋을듯 정식 통과 후 비속어 필터 통과 후 통과 후 중복 닉네임 검사 후 통과
        */
        switch (nicknameRegex.test(nickname)) {
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
    validatePassword: function (password: string): {
        isValid: boolean;
        message: string;
    } {
        //최소 8자 ~ 16자, 최소 하나의 대문자 포함 및 소문자 포함 및 특수문자 포함
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        switch (passwordRegex.test(password)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return {
                    isValid: false,
                    message: '비밀번호는 8~16자 이내로 입력해주세요.',
                };
                break;
        }
    },
    //이미지 유효성 검사
    validateImage: function (image: string): {
        isValid: boolean;
        message: string;
    } {
        //이미지 파일 확장자 검사
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
        switch (imageRegex.test(image)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return {
                    isValid: false,
                    message: '이미지 파일 확장자가 올바르지 않습니다.',
                };
                break;
        }
    },
    //넘버 타입 유효성 검사
    validateNumber: function (number: string): {
        isValid: boolean;
        message: string;
    } {
        //숫자만 입력 가능 (지수표현 이런거 허용 X)
        const numberRegex = /^[0-9]+$/;
        switch (numberRegex.test(number)) {
            case true:
                return { isValid: true, message: '성공' };
                break;
            case false:
                return { isValid: false, message: '숫자만 입력해주세요.' };
                break;
        }
    },
};
