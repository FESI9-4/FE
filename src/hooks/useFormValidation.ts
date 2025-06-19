import { UseFormWatch, FieldValues, Path } from 'react-hook-form';

interface UseFormValidationProps<TFormValues extends FieldValues> {
    watch: UseFormWatch<TFormValues>;
    fields: (keyof TFormValues)[];
}

export const useFormValidation = <TFormValues extends FieldValues>({
    watch,
    fields,
}: UseFormValidationProps<TFormValues>) => {
    const watchedValues = watch(fields as Path<TFormValues>[]);
    const isAllFieldsFilled = fields.every((field, index) => {
        const value = watchedValues[index];
        return value && typeof value === 'string' && value.trim() !== '';
    });

    return {
        isAllFieldsFilled,
        watchedValues,
    };
};
