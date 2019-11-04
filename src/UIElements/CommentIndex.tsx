import React from 'react';
import { useResource } from 'rest-hooks';
import CommentResource from '../resources/comment';

export default function PostIndex() {
    const sortBy = "id";
    const comments = useResource(CommentResource.listShape(), { sortBy });
    return (
        <ul>
        {comments.map(comment => (            
            <li> <h3>{comment.postId}</h3> {comment.content}</li>
        ))}
        </ul>
    );
}