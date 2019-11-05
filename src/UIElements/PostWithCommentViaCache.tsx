import React from 'react';
import { useCache, useResource } from 'rest-hooks';
import PostCommentResource from '../resources/postcomment';
import CommentResource from '../resources/comment';

import ArticleForeignCommentResource from '../resources/postforeignkey';

export default function PostWithCommentViaCache({ id }: { id: number|undefined }) {
    // parallel
    
    // sequential
    const post = useResource(ArticleForeignCommentResource.detailShape(), { id });
    const comment = useCache(CommentResource.detailShape(), { id: post.morecomment});

    return (
        <div>
            {post.content}
            <p>
                {post.morecomment}
            </p>
            <p>
            {comment!=null && <p>{comment.content}</p> }
            </p>
        </div>
      );
}
