import { customFetcher } from '@/utils/apis/customFetcher';

interface PostImageRequest {
  fileName: string;
}

interface PostImageResponse {
  statusCode: number;
  message: string;
  data: {
    preSignedUrl: string;
    key: string;
  };
}

interface GetImageResponse {
  statusCode: number;
  message: string;
  data: {
    preSignedUrl: string;
    key: string;
  };
}

export const imageUploadApi = {
  getUploadUrl: async (
    params: PostImageRequest
  ): Promise<PostImageResponse> => {
    return customFetcher<PostImageResponse, PostImageRequest>(
      `/api/images/postImage`,
      {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },

  getImageUrl: async (key: string): Promise<GetImageResponse> => {
    const query = new URLSearchParams({ key });

    return customFetcher<GetImageResponse, undefined>(
      `/api/images/getImage/getImage?${query.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
