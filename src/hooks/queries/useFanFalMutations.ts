import { useMutation } from '@tanstack/react-query';
import { fanFalApi } from '@/utils/apis/fanpalApi';

export interface FanFalResponse {
  statusCode: number;
  message: string;
  data: string;
}

export function useFanFalMutations() {
  const joinMutation = useMutation<FanFalResponse, Error, number>({
    mutationFn: (articleId) => fanFalApi.join(articleId),
  });

  const cancelMutation = useMutation<FanFalResponse, Error, number>({
    mutationFn: (articleId) => fanFalApi.cancel(articleId),
  });

  return { joinMutation, cancelMutation };
}
