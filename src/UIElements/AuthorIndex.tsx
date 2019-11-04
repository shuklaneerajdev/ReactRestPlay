import React from 'react';
import { useResource } from 'rest-hooks';
import AuthorResource from '../resources/author';
import { Link } from 'react-router-dom';

export default function PostIndex() {
    const sortBy = "id";
    const authors = useResource(AuthorResource.listShape(), { sortBy });
    return (
        <ul>
        {authors.map(author => (            
            <li> <h3>{author.name}</h3></li>
        ))}
        </ul>
    );
}