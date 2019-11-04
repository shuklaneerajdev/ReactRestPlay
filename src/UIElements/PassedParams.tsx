import React from 'react';
import { useResource } from 'rest-hooks';
import PostResource from '../resources/post';
import { Link } from 'react-router-dom';

export default function PassedParams() {
    const sortBy = "id";
    const { posts: posts, nextPage, prevPage } = useResource(
        PostResource.listShape(),
        { page: 2 , order: 'desc', author: 'alive'},
      );
    return (
        <ul>        
        {posts.map(post => (            
            <li> <h3>{post.title}</h3> {post.content}</li>
        ))}
        <h3>{prevPage && <Link to={prevPage}>‹ Prev</Link>}</h3>
        <h3>{nextPage && <Link to={nextPage}>Next ›</Link>}</h3>                        
        </ul>
    );
}