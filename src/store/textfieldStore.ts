import { create } from 'zustand';
//TextField가 받을 상태
interface FieldState {
    variant: 'default' | 'done' | 'typing' | 'error';
    showHelperText: boolean;
    validatedMessage: string;
    displayFileName: string;
    isControlled: boolean;
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
    setShowHelperText: (fieldName: string, show: boolean) => void;
    setValidatedMessage: (fieldName: string, message: string) => void;
    setDisplayFileName: (fieldName: string, fileName: string) => void;
    setIsControlled: (fieldName: string, isControlled: boolean) => void;
    setVariant: (
        fieldName: string,
        variant: 'default' | 'done' | 'typing' | 'error'
    ) => void;
    // 필드 존재 여부 확인 헬퍼 함수
    hasField: (fieldName: string) => boolean; // 필드 존재 확인
    getField: (fieldName: string) => FieldState | null; // 안전한 필드 조회
    getAllFieldNames: () => string[]; // 모든 필드 이름 조회

    // 🎯 복합 액션들 (새로 추가!)
    handleValidationResult: (
        fieldName: string,
        result: { isValid: boolean; message: string }
    ) => void;
}

//기본 필드 상태 값
const DEFAULT_FIELD_STATE: FieldState = {
    variant: 'default',
    showHelperText: false,
    validatedMessage: '',
    displayFileName: '',
    isControlled: false,
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

        // isControlled는 유지하면서 나머지만 리셋
        const currentField = get().getField(fieldName);
        get().updateField(fieldName, {
            ...DEFAULT_FIELD_STATE,
            isControlled: currentField?.isControlled || false, // 기존 제어 상태 유지
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
            return { fields: remainingFields };
        });

        console.log(`🗑️ ${fieldName} 필드가 제거되었습니다.`);
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

    setIsControlled: (fieldName, isControlled) => {
        get().updateField(fieldName, { isControlled });
    },

    // 🚀 복합 액션들
    handleValidationResult: (fieldName, result) => {
        get().updateField(fieldName, {
            variant: result.isValid ? 'done' : 'error',
            showHelperText: !result.isValid,
            validatedMessage: result.message,
        });
    },
}));
