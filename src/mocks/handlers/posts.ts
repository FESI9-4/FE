import { http, HttpResponse } from 'msw';

export const INITIAL_POSTS = [
    {
        id: 1,
        title: '리액트를 재밌게 공부하는 법 (mock)',
        content: '리액트를 재밌게 공부하는 법이란 ~ (mock)',
    },
    {
        id: 2,
        title: 'Next.js를 재밌게 공부하는 법 (mock)',
        content: 'Next.js를 재밌게 공부하는 법이란 ~ (mock)',
    },
];

export const postsHandlers = [
    http.get('/api/posts', () => {
        return HttpResponse.json(INITIAL_POSTS);
    }),
    http.get('https://jsonplaceholder.typicode.com/posts', () => {
        return HttpResponse.json(INITIAL_POSTS);
    }),
];
