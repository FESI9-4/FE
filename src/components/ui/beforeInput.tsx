'use client';
import clsx from 'clsx';
import { useEffect } from 'react';
import useInputState from '@/hooks/useInputState';
import Image from 'next/image';
interface InputProps {
    placeholder?: string; // 플레이스홀더 메시지
    errorMessage?: string; // 유효성 검사 오류 메시지 -> isValid가 false일 때 표시됩니다!
    isValid?: boolean; // 유효성 검사 결과
    value?: string; // 입력 값
    name?: string; // 인풋 name
    id: string; // 인풋 id (인풋의 id 속성과 label의 htmlFor 값으로 들어감)
    label?: string; // 라벨 메시지
    type: 'text' | 'password' | 'email' | 'number' | 'file'; // type 타입
    autoComplete?: 'off' | 'on' | 'new-password' | 'current-password'; //자동 완성 기능
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<Element>) => void;
    onMouseLeave?: (e: React.MouseEvent<Element>) => void;
    setCount?: (count: string) => void;
}

export default function Input({
    placeholder,
    value,
    type,
    isValid = true,
    errorMessage = '',
    autoComplete = 'off',
    name = '',
    label = '',
    id,
    onChange,
    onBlur,
    onFocus,
    setCount,
}: InputProps) {
    const {
        isVisible, // 패스워드 타입일 경우 눈모양 버튼 표시 여부 관리 상태
        inputState, // 인풋 보더 스타일링 관리 상태
        setInputState, // 인풋 보더 스타일링 상태 변경
        handleVisibleClick, // 패스워드의 눈모양 버튼 클릭 이벤트
        handleAddClick, // 넘버 타입일 경우 + 버튼 클릭 이벤트
        handleSubClick, // 넘버 타입일 경우 - 버튼 클릭 이벤트
        handleHover, // 마우스 오버 이벤트
        handleLeave, // 마우스 떠날 때 이벤트
        handleChange, // 인풋 값 변경 이벤트
        handleBlur, // 인풋 블러 이벤트
    } = useInputState();
    // 인풋 스타일
    const INPUT_STYLES = {
        // 공통 스타일
        baseStyle: `rounded-xl font-medium 
        text-sm leading-5 md:text-base md:leading-6
        bg-gray-900 outline-none px-3 py-2 sm:py-[10px] placeholder:text-gray-600`,
        //넘버 타입일 경우 스핀버튼 제거
        numberStyle:
            type !== 'number'
                ? `w-full`
                : `text-center w-full
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none`,
        //패스워드 타입일 경우 오른쪽 패딩값 설정
        passwordStyle: type === 'password' ? `pr-12` : `pr-4`,
        // 상태 스타일
        state: {
            default: `border-2 border-transparent text-white`,
            hover: `border-2 border-green-900 text-white`,
            done: `border-2 border-gray-900 text-white`,
            typing: `border-2 border-green-400 text-white`,
            error: `border-2 border-red-500 text-white`,
        },
        // 트랜지션
        transition: `transition-border-color duration-300`,
        // autofill 스타일 -> INPUT 컴포넌트에서 기본으로 적용되는 디자인으로 적용시킴
        autoFillStyle: `[&:is(:-webkit-autofill,:autofill)]:!bg-gray-800
        [&:is(:-webkit-autofill,:autofill)]:!text-gray-400
        [&:is(:-webkit-autofill,:autofill)]:!shadow-[0_0_0_1000px_rgb(43,44,48)_inset]
        [&:is(:-webkit-autofill,:autofill)]:![-webkit-text-fill-color:rgb(107,114,128)]`,
    };
    // 유효성 검사 오류 메시지 스타일
    const ERROR_MESSAGE_STYLES = {
        baseStyle: `pl-1 text-red-500 font-medium text-sm leading-5 md:text-base md:leading-6`,
        // 트랜지션 스타일
        animation: `transition-all duration-300 ease-in-out overflow-hidden`,
        // 상위 컴포넌트에서 받은 유효성 검증 값에 따라 다른 스타일 적용
        visibility: !isValid
            ? `opacity-100 max-h-[44px] translate-y-0`
            : `opacity-0 max-h-0 translate-y-[-8px] pointer-events-none`,
    };
    // 파일 업로드 인풋 스타일 (화면에 보이는 요소는 div 태그로 구현)
    const FILE_INPUT_STYLES = {
        // 공통 스타일
        baseStyle: `px-3 py-2 sm:py-[10px] w-full rounded-xl font-medium 
        text-sm leading-5 md:text-base md:leading-6
        bg-gray-900 flex items-center overflow-hidden
        whitespace-nowrap text-ellipsis`,

        // 상태 스타일
        state: {
            default: `border-2 border-transparent text-gray-600`,
            hover: `border-2 border-green-900 ${!value ? 'text-gray-600' : 'text-white'}`,
            done: `border-2 border-gray-900 ${!value ? 'text-gray-600' : 'text-white'}`,
            typing: `border-2 border-green-400 text-white`,
            error: `border-2 border-red-500 text-white`,
        },
        // 트랜지션
        transition: `transition-border-color duration-300`,
    };
    // 인풋에 최종 적용되는 스타일
    const inputClasses = clsx(
        INPUT_STYLES.baseStyle,
        INPUT_STYLES.state[inputState],
        INPUT_STYLES.transition,
        INPUT_STYLES.autoFillStyle,
        INPUT_STYLES.numberStyle,
        INPUT_STYLES.passwordStyle
    );
    // 파일 업로드 인풋(div)에 최종 적용되는 스타일
    const fileInputClasses = clsx(
        FILE_INPUT_STYLES.baseStyle,
        FILE_INPUT_STYLES.state[inputState],
        FILE_INPUT_STYLES.transition
    );
    // 파일 커스텀 업로드 버튼 스타일
    const fileCustomButtonClasses = clsx(
        `bg-white min-w-fit text-orange-600 
        border border-orange-600 rounded-xl px-2 
        flex items-center justify-center cursor-pointer
        font-medium text-sm md:text-base`
    );
    // 넘버 타입일 경우 +,- 버튼 표시
    const numberButtonClasses = clsx(
        `h-10 md:h-11 bg-gray-900 rounded-lg text-gray-400 text-center font-pretendard font-bold 
        font-size-3xl leading-5 md:leading-6 hover:bg-gray-700 hover:scale-110
        transition-all duration-300 min-w-10 max-w-30`
    );
    useEffect(() => {
        // 유효성 검사 결과 실패
        if (!isValid) setInputState('error');
        // 유효성 검사 결과 성공
        if (isValid) setInputState('done');
    }, [isValid, setInputState]);
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="font-semibold text-sm leading-5 text-gray-900"
                    >
                        {label}
                    </label>
                )}
                <div className="relative w-full mt-4 flex items-center gap-10">
                    {/* 넘버 타입일 경우 +,- 버튼 표시 */}
                    {type === 'number' && (
                        <button
                            onClick={() =>
                                handleSubClick(value || '0', setCount!)
                            }
                            className={numberButtonClasses}
                        >
                            -
                        </button>
                    )}
                    {/* 파일 인풋 경우 */}
                    {type === 'file' ? (
                        <div className="gap-3 w-full flex">
                            <input
                                id={id}
                                name={name}
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    handleChange(e, type, setCount!, onChange!)
                                }
                                onBlur={(e) =>
                                    handleBlur(e, isValid, value || '', onBlur!)
                                }
                            />
                            <div
                                className={fileInputClasses}
                                onMouseEnter={handleHover}
                                onMouseLeave={() =>
                                    handleLeave(isValid, value || '')
                                }
                            >
                                {value ||
                                    placeholder ||
                                    '이미지를 첨부해주세요'}
                            </div>
                            <label
                                htmlFor={id}
                                className={fileCustomButtonClasses}
                            >
                                파일 찾기
                            </label>
                        </div>
                    ) : (
                        <input
                            id={id}
                            name={name}
                            autoComplete={autoComplete}
                            className={inputClasses}
                            placeholder={placeholder}
                            value={value}
                            type={
                                isVisible && type === 'password' ? 'text' : type
                            }
                            onChange={(e) =>
                                handleChange(e, type, setCount!, onChange!)
                            }
                            onMouseEnter={handleHover}
                            onMouseLeave={() =>
                                handleLeave(isValid, value || '')
                            }
                            onBlur={(e) =>
                                handleBlur(e, isValid, value || '', onBlur!)
                            }
                            onFocus={onFocus}
                        />
                    )}
                    {/* 넘버 타입일 경우 +,- 버튼 표시 */}
                    {type === 'number' && (
                        <button
                            onClick={() =>
                                handleAddClick(value || '0', setCount!)
                            }
                            className={numberButtonClasses}
                        >
                            +
                        </button>
                    )}
                    {/* 패스워드 타입일 경우 눈모양 버튼 표시 */}
                    {type === 'password' && (
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 cursor-pointer h-[38px] sm:h-[42px] flex items-center justify-center" // flex 추가
                            onClick={handleVisibleClick}
                        >
                            {
                                <Image
                                    priority
                                    src={
                                        isVisible
                                            ? '/icons/visibility_on.svg'
                                            : '/icons/visibility_off.svg'
                                    }
                                    alt="visibility"
                                    width={24}
                                    height={24}
                                />
                            }
                        </button>
                    )}
                </div>
            </div>
            {/* 유효성 검사 오류 메시지 클래스명에 의해 보이고 안보이고 결정*/}
            <span
                className={clsx(
                    ERROR_MESSAGE_STYLES.baseStyle,
                    ERROR_MESSAGE_STYLES.animation,
                    ERROR_MESSAGE_STYLES.visibility
                )}
            >
                {errorMessage}
            </span>
        </div>
    );
}
