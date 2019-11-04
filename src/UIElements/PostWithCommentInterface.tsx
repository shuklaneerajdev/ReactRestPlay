import React from 'react';
import { useResource } from 'rest-hooks';
import PostCommentResource from '../resources/postcomment';
import AuthorResource from '../resources/author';

export default function PostWithCommentInterface({ id }: { id: number|undefined }) {
    // parallel
    
    // sequential
    const post = useResource(PostCommentResource.detailShape(), { id });
    return (
        <ul>
            <div>
                <blockquote>
                    The comment in the post is declared via an interface.
                </blockquote>
            </div>
        <div>
        <p>{post.content}</p>
        <p>
            {post.comment!=null && <p>{post.comment.content}</p> }
        </p>

        </div>        
        </ul>
    );
}