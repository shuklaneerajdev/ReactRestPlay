import { Resource, AbstractInstanceType } from 'rest-hooks';
export default class CommentResource extends Resource {
    readonly id: string = '';
  
    pk() { return this.id; }
  
    // since we won't be using urlRoot to build our urls we
    // still need to tell rest hooks how to uniquely identify this Resource
    static getKey() {
      return 'CommentResource';
    }
  
    /**
     * Get the url for a Resource
     */
    static url<T extends typeof Resource>(
      this: T,
      urlParams?: { postId: string } & Partial<AbstractInstanceType<T>>,): string {
      if (urlParams) {
        const { postId, ...realSearchParams } = urlParams;
        if (this.pk(urlParams) !== undefined) {
          return `http://localhost:3000/articles/${postId}/comments/${this.pk(urlParams)}`;
        }
      }
      // since we're overriding the url() function we must keep the type the
      // same, which means we might not get urlParams
      throw new Error('Comments require articleId to retrieve');
    }
  
    /**
     * Get the url for many Resources
     */
    static listUrl<T extends typeof Resource>(
      this: T,
      searchParams?: { postId: string } & Readonly<Record<string, string | number>>,
    ): string {
      if (searchParams && Object.keys(searchParams).length) {
        const { postId, ...realSearchParams } = searchParams;
        const params = new URLSearchParams(realSearchParams as any);
        // this is essential for consistent url strings
        params.sort();
        return `http://localhost:3000/articles/${postId}/comments/?${params.toString()}`;
      }
      throw new Error('Comments require articleId to retrieve');
    }
  }