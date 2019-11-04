import { camelCase, snakeCase } from 'lodash';
import { Method, Resource } from 'rest-hooks';
  
  function deeplyApplyKeyTransform(obj: any, transform: (key: string) => string) {
    const ret: { [key: string]: any } = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
      if (obj[key] != null && typeof obj[key] === 'object') {
        ret[transform(key)] = deeplyApplyKeyTransform(obj[key], transform);
      } else {
        ret[transform(key)] = obj[key];
      }
    });
    return ret;
  }
  
  // We can now extend CamelResource instead of Resource to build
  // all of our classes.
  abstract class CamelResource extends Resource {
    static async fetch<T extends typeof Resource>(
      this: T,
      method: Method = 'get',
      url: string,
      body?: Readonly<object | string>,
    ) {
      // we'll need to do the inverse operation when sending data back to the server
      if (body) {
        body = deeplyApplyKeyTransform(body, snakeCase);
      }
      // perform actual network request getting back json
      const jsonResponse = await super.fetch(method, url, body);
      // do the conversion!
      return deeplyApplyKeyTransform(jsonResponse, camelCase);
    }
  }

export default class CommentResource extends CamelResource {
  readonly id: number | undefined = undefined;
  readonly content: string = '';
  readonly postId: number | undefined = undefined;

  pk() {
    return this.id;
  }

  static urlRoot = 'http://localhost:3000/comments/';
}