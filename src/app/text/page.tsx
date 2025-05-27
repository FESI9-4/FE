function TextPage() {
    const [text, setText] = useState('');
    const [number, setNumber] = useState(10);
    const validator = validators.validateImage;
    return (
        <div>
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
        </div>
    );
}

export default TextPage;
