import { DetailApiResponse } from '@/types/detail';
import { customFetcher } from '@/utils/apis/customFetcher';

// 팬팔 참여, 취소 
// 댓글 조회, 작성, 수정, 삭제
    
// 이 파일 보드 api에 넣어야할듯? pr 머지되면통합
export const getDetailApi = {
    getDetailById: async (
        articleId: number
    ): Promise<DetailApiResponse['data']> => {
        return customFetcher<DetailApiResponse, undefined>(
            `/api/board/${articleId}`,
            {
                method: 'GET',
            }
        ).then((res) => res.data);
    },
};
