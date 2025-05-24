// TextField/index.ts (간단한 버전)
import TextField from './TextField';
import Input from './Input';
import Label from './Label';
import HelperText from './HelperText';
import FileInput from './FileInput';
import NumberInput from './NumberInput';

// 🔥 Object.assign으로 속성 추가 (타입 안전)
const TextFieldWithComponents = Object.assign(TextField, {
    Input,
    Label,
    HelperText,
    FileInput,
    NumberInput,
});

export default TextFieldWithComponents;
export { Input, Label, HelperText, FileInput, NumberInput };
