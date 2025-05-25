import { create } from 'zustand';
export type ValidationResult = {
    isValid: boolean;
    message: string;
};
export type InputValue =
    | string // text, email, password, date 등
    | number // 변환된 숫자
    | File // 단일 파일
    | FileList // 다중 파일
    | Date // 변환된 날짜
    | boolean // checkbox, radio
    | null // 값이 없을 때
    | readonly string[]
    | undefined; //
export type InputVariant = 'default' | 'done' | 'typing' | 'error';
export type InputSize = 'small' | 'large';
export type LabelSize = 'small' | 'large';
// UI 관련 상태
interface FieldState {
    variant: InputVariant; // 인풋 상태
    showHelperText: boolean; // 헬퍼 텍스트 표시 여부
    validatedMessage: string; // 유효성 검증 메시지
    displayFileName?: string; // 파일 업로드 시 사용자에게 보여줄 파일 이름
    showPassword?: boolean; // 비밀번호 표시 여부
    isValid: boolean; // 폼 검증
}
interface TextFieldStore {
    // 🔩 상태
    fields: Record<string, FieldState>; // 필드별로 상태 관리 (key = 필드 이름)
    //기본 관리 함수들
    initField: (fieldName: string) => void; // 필드 초기화
    updateField: (fieldName: string, updates: Partial<FieldState>) => void;
    resetField: (fieldName: string) => void;
    removeField: (fieldName: string) => void;

    // 개별 setter
    setShowPassword: (fieldName: string, show: boolean) => void;
    setShowHelperText: (fieldName: string, show: boolean) => void;
    setValidatedMessage: (fieldName: string, message: string) => void;
    setDisplayFileName: (fieldName: string, fileName: string) => void;
    setVariant: (
        fieldName: string,
        variant: 'default' | 'done' | 'typing' | 'error'
    ) => void;
    // 필드 존재 여부 확인 헬퍼 함수
    hasField: (fieldName: string) => boolean; // 필드 존재 확인
    getField: (fieldName: string) => FieldState | null; // 안전한 필드 조회
    getAllFieldNames: () => string[]; // 모든 필드 이름 조회

    // 🎯 복합 액션들 (새로 추가!)
    validate: (
        fieldName: string,
        value: InputValue,
        validator: (value: InputValue) => ValidationResult
    ) => ValidationResult;
    // 비밀번호 표시 토글
    togglePassword: (fieldName: string) => void;
}

//기본 필드 상태 값
const DEFAULT_FIELD_STATE: FieldState = {
    variant: 'default',
    showHelperText: false,
    validatedMessage: '',
    displayFileName: '',
    showPassword: false,
    isValid: false,
};
export const useTextFieldStore = create<TextFieldStore>((set, get) => ({
    // 🔩 상태 초기값 (처음에는 빈 객체)
    fields: {},
    // 필드 존재 여부 확인
    hasField: (fieldName: string) => {
        return fieldName in get().fields;
    },
    // 안전한 필드 조회
    getField: (fieldName: string) => {
        const field = get().fields[fieldName];
        return field || null;
    },
    // 모든 필드 이름 조회
    getAllFieldNames: () => {
        return Object.keys(get().fields);
    },
    initField: (fieldName: string) => {
        // 이미 필드가 있으면 경고하고 종료
        if (get().hasField(fieldName)) {
            console.warn(
                `${fieldName} 필드가 이미 존재합니다. 초기화를 건너뜁니다.`
            );
            return;
        }

        set((state) => ({
            fields: {
                ...state.fields,
                [fieldName]: { ...DEFAULT_FIELD_STATE }, // 기본값 사용
            },
        }));

        console.log(`✅ ${fieldName} 필드가 초기화되었습니다.`);
    },

    updateField: (fieldName: string, updates: Partial<FieldState>) => {
        set((state) => {
            // 필드가 없으면 경고하고 생성
            if (!state.fields[fieldName]) {
                console.warn(`${fieldName} 필드가 없어서 새로 생성합니다.`);
                return {
                    fields: {
                        ...state.fields,
                        [fieldName]: {
                            ...DEFAULT_FIELD_STATE, // 기본값 사용
                            ...updates,
                        },
                    },
                };
            }

            // 필드가 있으면 업데이트
            return {
                fields: {
                    ...state.fields,
                    [fieldName]: {
                        ...state.fields[fieldName],
                        ...updates,
                    },
                },
            };
        });
    },

    resetField: (fieldName: string) => {
        if (!get().hasField(fieldName)) {
            console.warn(`${fieldName} 필드가 존재하지 않습니다.`);
            return;
        }
        get().updateField(fieldName, {
            ...DEFAULT_FIELD_STATE,
        });

        console.log(`🧹 ${fieldName} 필드가 초기화되었습니다.`);
    },

    removeField: (fieldName: string) => {
        if (!get().hasField(fieldName)) {
            console.warn(`${fieldName} 필드가 존재하지 않습니다.`);
            return;
        }
        set((state) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [fieldName]: _, ...remainingFields } = state.fields;
            console.log(`🗑️ ${fieldName} 필드가 제거되었습니다.`);
            return { fields: remainingFields };
        });
    },
    // 🎯 간단한 setter들 (updateField 사용)
    setVariant: (fieldName, variant) => {
        get().updateField(fieldName, { variant });
    },

    setShowHelperText: (fieldName, show) => {
        get().updateField(fieldName, { showHelperText: show });
    },

    setValidatedMessage: (fieldName, message) => {
        get().updateField(fieldName, { validatedMessage: message });
    },

    setDisplayFileName: (fieldName, fileName) => {
        get().updateField(fieldName, { displayFileName: fileName });
    },
    setShowPassword: (fieldName, show) => {
        get().updateField(fieldName, { showPassword: show });
    },
    // 이벤트 핸들러에서 유효성 검증
    validate: (fieldName, value, validator) => {
        const result = validator(value);
        get().updateField(fieldName, {
            variant: result.isValid ? 'done' : 'error',
            showHelperText: !result.isValid,
            validatedMessage: result.message,
            isValid: result.isValid, // 👈 추가
        });
        return result;
    },
    togglePassword: (fieldName) => {
        get().updateField(fieldName, {
            showPassword: !get().getField(fieldName)?.showPassword,
        });
    },
}));
