
import { useMutation } from '@tanstack/react-query';
import { commentApi } from '@/utils/apis/commentApi';

interface PostCommentRequest {
  parentCommentId: number | null;
  secret: boolean;
  content: string;
}

export const usePostComment = () => {
  return useMutation(
    (body: PostCommentRequest) => commentApi.postCommentByArticleId(body.articleId, body),
    {
      onSuccess: () => {
        alert('댓글이 등록되었습니다.');
        // 댓글 리스트 새로고침이나 상태 업데이트 작업 가능
      },
      onError: (error) => {
        alert('댓글 등록 실패: ' + (error as Error).message);
      },
    }
  );
};
