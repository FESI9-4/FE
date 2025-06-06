'use client';

import { useForm, Controller } from 'react-hook-form';
import BaseModal from '@/components/ui/Modal';
import { DeleteIcon } from '@/assets/index';
import PlaceAutoCompleteInput from './PlaceAutoCompleteInput';
import { CATEGORY_DATA } from '@/types/categoriesType';

import {
    InputText,
    InputNumber,
    DateInput,
    BoxSelect,
    Input,
    InputFile,
    Button,
} from '@/components/ui';

interface PanpalModalProps {
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

//TODO api 명세서에 맞게 수정해야함.
// TODO 이미지 또한 업로드 -> 키
interface FormData {
    name: string;
    detail: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    file?: FileList;
    category: string;
    startDate?: string;
    endDate?: string;
    minApplicants?: number;
    maxApplicants?: number;
}

export default function PanpalModal({ onClose, onSubmit }: PanpalModalProps) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            detail: '',
            location: { lat: 0, lng: 0, address: '' },
        },
    });

    const onFormSubmit = (data: FormData) => {
        console.log('폼 제출 데이터:', data);
        onSubmit(data);
    };

    const startDate = watch('startDate');

    return (
        <BaseModal onClose={onClose} fullScreenOnMobile>
            <div className="w-full h-[100vh] flex items-center justify-center">
                <div className="relative w-full max-w-130 h-full m-4 flex flex-col">
                    <div className="flex justify-between items-center px-4 pt-6 h-[50px] text-lg font-semibold z-10">
                        <p>팬팔 만들기</p>
                        <DeleteIcon
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>

                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        className="flex-1 overflow-y-auto sm:max-h-[75vh] lg:max-h-[68vh] px-4 mt-6 flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-2 h-19">
                            <p className="text-sm font-semibold h-6">
                                팬팔 이름
                            </p>
                            <Input<FormData>
                                type="text"
                                name="name"
                                placeholder="팬팔 이름을 작성해주세요"
                                register={register}
                                rules={{
                                    required: '상세 내용을 입력해주세요',
                                }}
                                error={errors.detail}
                                size="small"
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-35.5">
                            <p className="text-sm font-semibold">상세 내용</p>
                            <InputText<FormData>
                                name="detail"
                                placeholder="상세 내용을 입력해주세요"
                                register={register}
                                rules={{ required: '내용을 입력해주세요' }}
                                error={errors.detail}
                                size="small"
                                className="h-27.5"
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-18 ">
                            <p className="text-sm font-semibold h-6">장소</p>
                            <Controller
                                name="location"
                                control={control}
                                rules={{
                                    validate: (loc) =>
                                        loc.address !== '' ||
                                        '장소를 선택해주세요',
                                }}
                                render={({ field }) => (
                                    <PlaceAutoCompleteInput
                                        onPlaceSelect={(lat, lng, address) => {
                                            field.onChange({
                                                lat,
                                                lng,
                                                address,
                                            });
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-18">
                            <p className="text-sm font-semibold h-6">이미지</p>

                            <InputFile<FormData>
                                name="file"
                                accept="image/*"
                                register={register}
                                rules={{
                                    validate: {
                                        fileSize: (files) => {
                                            if (!files) return true;

                                            if (files instanceof FileList) {
                                                const maxSize = 5 * 1024 * 1024;
                                                return (
                                                    files[0].size <= maxSize ||
                                                    '파일 크기는 5MB 이하여야 합니다'
                                                );
                                            }

                                            return true;
                                        },
                                    },
                                }}
                                error={errors.file}
                                size="small"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-sm font-semibold h-6">
                                선택 서비스
                            </p>

                            <BoxSelect<FormData>
                                categories={CATEGORY_DATA}
                                register={register}
                                name="category"
                                rules={{
                                    required: '서비스를 선택해주세요.',
                                }}
                                error={errors.category}
                            />
                        </div>

                        <div className="h-53 pt-6 border-t border-gray-700 flex flex-col gap-5">
                            <div className="h-18">
                                <p className="text-sm font-semibold h-6">
                                    팬팔 날짜
                                </p>
                                <div className="h-11 ">
                                    <DateInput
                                        name="startDate"
                                        control={control}
                                        type="datetime-local"
                                        minDate={new Date()}
                                        isStartDate={true}
                                        error={errors.startDate}
                                        placeholder="시작 날짜를 선택해주세요"
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="h-18">
                                <p className="text-sm font-semibold h-6">
                                    마감 날짜
                                </p>
                                <div className="h-11 ">
                                    <DateInput<FormData>
                                        name="endDate"
                                        control={control}
                                        type="datetime-local"
                                        minDate={
                                            startDate
                                                ? new Date(startDate)
                                                : new Date()
                                        }
                                        isStartDate={false}
                                        error={errors.startDate}
                                        placeholder="마감 날짜를 선택해주세요"
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700 flex flex-col gap-2">
                            <p className="text-sm font-semibold h-6">
                                모집 정원
                            </p>
                            <div className="h-10  flex items-center justify-between ">
                                <p className="text-gray-300 text-sm ">
                                    최소 인원
                                </p>
                                <div className="w-30 h-10 flex items-center ">
                                    <InputNumber
                                        name="minApplicants"
                                        control={control}
                                        rules={{
                                            required:
                                                '모집 정원을 입력해주세요',
                                            validate: (value) => {
                                                const num = Number(value);
                                                return (
                                                    (Number.isInteger(num) &&
                                                        num > 0) ||
                                                    '1 이상의 정수를 입력해주세요'
                                                );
                                            },
                                        }}
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="h-10  flex items-center justify-between ">
                                <p className="text-gray-300 text-sm ">
                                    최대 인원
                                </p>
                                <div className="w-30 h-10 flex items-center">
                                    <InputNumber
                                        name="maxApplicants"
                                        control={control}
                                        rules={{
                                            required:
                                                '모집 정원을 입력해주세요',
                                            validate: (value) => {
                                                const num = Number(value);
                                                return (
                                                    (Number.isInteger(num) &&
                                                        num > 0) ||
                                                    '1 이상의 정수를 입력해주세요'
                                                );
                                            },
                                        }}
                                        size="small"
                                        className="m"
                                    />
                                </div>
                            </div>
                            <div className="h-8"></div>
                        </div>

                        <div className="px-4 py-3 z-10 flex justify-center">
                            <Button size="large" type="submit">
                                팬팔 만들기
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    );
}
