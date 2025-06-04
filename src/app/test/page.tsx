'use client';

import { useEffect, useState } from 'react';

export default function Home() {
    const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/posts'
            );
            const posts = await response.json();
            setPosts(posts);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>클라이언트 컴포넌트</h1>
            {posts.map((post: { id: number; title: string }) => (
                <div className="bg-blue-700 text-green-700" key={post.id}>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
    );
}
