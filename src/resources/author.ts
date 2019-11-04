import { Resource } from 'rest-hooks';

export default class PostResource extends Resource {
  readonly id: number | undefined = undefined;
  readonly name: string = '';
  
  pk() {
    return this.id;
  }

  static urlRoot = 'http://localhost:3000/authors';
}