import { AbstractInstanceType, Resource, schemas } from "rest-hooks";
import CommentResource from './comment';
import BaseResource from './BaseResource';
export default class ArticleForeignCommentResource extends BaseResource {
  readonly id: number | undefined = undefined;
  readonly content: string = '';
  readonly author: number | null = null;
  readonly morecomment: number |null = null;

  pk() {
    return this.id;
  }
  static urlRoot = 'http://localhost:3000/posts/';

  static getEntitySchema<T extends typeof Resource>(this: T) {
    const schema = super.getEntitySchema();
    schema.define({
      morecomment: CommentResource.getEntitySchema()
    });
    return schema as any;
  }  

}