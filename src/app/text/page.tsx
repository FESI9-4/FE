'use client';
import TextField from '@/components/ui/TextField';
import { validators } from '@/utils/validators';

export default function TextFieldPage() {
    return (
        <TextField
            label="이름"
            helperText="이름을 입력하세요."
            onValidate={validators.validateNickname}
        />
    );
}
