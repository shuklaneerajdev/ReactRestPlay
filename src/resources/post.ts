import {
    Resource,
    SchemaList,
    ReadShape,
    AbstractInstanceType,
  } from 'rest-hooks';
  
export default class PostResource extends Resource {
  readonly id: number | undefined = undefined;
  readonly title: string = '';
  readonly content: string = '';

  pk() {
    return this.id;
  }

  static urlRoot = 'http://localhost:3000/posts/';
  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: { posts: [this.getEntitySchema()], nextPage: '', prevPage: '' },
    };
  }  
}