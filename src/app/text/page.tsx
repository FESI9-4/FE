'use client';
import TextField from '@/components/ui/TextField';
import { validators } from '@/utils/validators';
import { useState } from 'react';

function TextPage() {
    const [text, setText] = useState('');
    const [number, setNumber] = useState(10);
    const [date, setDate] = useState<Date>(new Date()); // 처음부터 오늘 날짜
    const [date2, setDate2] = useState<Date>(new Date()); // 처음부터 오늘 날짜
    const [date3, setDate3] = useState<Date>(new Date()); // 처음부터 오늘 날짜
    const validator = validators.validateImage;
    return (
        <div className="flex flex-col gap-4 p-3">
            <TextField name="text">
                <TextField.Input defaultValue="test" />
            </TextField>
            <TextField name="text2">
                <TextField.Input
                    defaultValue="test"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </TextField>
            <TextField name="number">
                <TextField.NumberInput
                    value={number}
                    onChange={(value) => setNumber(value)}
                    min={0}
                    max={10}
                />
            </TextField>
            <TextField name="file">
                <TextField.FileInput
                    buttonText="파일 선택"
                    emptyText="파일을 선택해주세요."
                    accept="image/*"
                    onValidate={validator}
                />
                <TextField.HelperText className="text-red-500" />
            </TextField>
            <TextField name="date">
                <TextField.DateInput
                    value={date}
                    onChange={(value) => setDate(value as Date)}
                />
            </TextField>
            <div className="flex gap-4">
                <TextField name="startDate">
                    <TextField.DateInput
                        value={date2}
                        onChange={(value) => setDate2(value as Date)}
                        type="datetime-local"
                        isStartDate={true} // 진행 날짜
                        minDate={new Date()} //선택 가능한 날짜 범위
                        maxDate={new Date(2025, 11, 31)}
                    />
                </TextField>
                <TextField name="endDate">
                    <TextField.DateInput
                        value={date3}
                        onChange={(value) => setDate3(value as Date)}
                        type="datetime-local"
                        isStartDate={false} // 모집 마감날짜
                    />
                </TextField>
            </div>
        </div>
    );
}

export default TextPage;
