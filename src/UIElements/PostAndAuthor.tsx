import React from 'react';
import { useResource } from 'rest-hooks';
import PostResource from '../resources/post';
import AuthorResource from '../resources/author';

export default function PostAndAuthor({ id }: { id: number|undefined }) {
    // parallel
    
    // sequential
    const post = useResource(PostResource.detailShape(), { id });
    const author = useResource(
        AuthorResource.detailShape(),
        {
        id: post.id
        }
    );
    return (
        <ul>
            <div>
                <blockquote>
                    Once we get an entity, and the IDs of its related entities, we 
                    can can make sequential call such as above to get them all together 
                    at once place and display them.
                </blockquote>
            </div>
        <div>
        <h1>
            {post.id} by {author && author.name}
        </h1>
        <p>{post.content}</p>
        </div>        
        </ul>
    );
}