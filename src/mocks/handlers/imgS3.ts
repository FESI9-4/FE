import { http, HttpResponse } from 'msw';

export const imageHandlers = [
  http.post('http://localhost:3000/api/images/postImage', async ({ request }) => {
    const body = await request.json() as { fileName: string };
    const { fileName } = body;

    return HttpResponse.json({
      statusCode: 200,
      message: '업로드 URL 생성 성공',
      data: {
        preSignedUrl: `https://mock-s3-url.com/upload/${fileName}`,
        key: `uploads/${fileName}`,
      },
    });
  }),

  http.get('http://localhost:3000/api/images/getImage/getImage', ({ request }) => {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    if (!key) {
      return HttpResponse.json(
        {
          statusCode: 400,
          message: 'key가 누락되었습니다.',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      statusCode: 200,
      message: '이미지 URL 조회 성공',
      data: {
        preSignedUrl: `https://mock-s3-url.com/view/${key}`,
        key,
      },
    });
  }),

  // PUT 요청도 모킹해서 실패 방지
  http.put('https://mock-s3-url.com/upload/:fileName', () => {
    return HttpResponse.json(
      {
        statusCode: 200,
        message: '모킹된 업로드 성공',
      },
      { status: 200 }
    );
  }),
];
