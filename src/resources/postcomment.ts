import {
    Resource,
    SchemaList,
    ReadShape,
    AbstractInstanceType,
  } from 'rest-hooks';
  
interface Comment{
    readonly id: string;
    readonly content: string;
    readonly post_id: string;
}
export default class PostCommentResource extends Resource {
  readonly id: number | undefined = undefined;
  readonly title: string = '';
  readonly content: string = '';
  readonly comment: Comment| null = null;
  pk() {
    return this.id;
  }

  static urlRoot = 'http://localhost:3000/posts/';
}