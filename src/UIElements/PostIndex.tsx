import React from 'react';
import { useResource } from 'rest-hooks';
import PostResource from '../resources/post';

export default function PostIndex() {
    const sortBy = "id";
    const posts = useResource(PostResource.listShape(), { sortBy });
    return (
        <ul>
        {posts.posts.map(post => (            
            <li> <h3>{post.title}</h3> {post.content}</li>
        ))}
        </ul>
    );
}