import { camelCase, snakeCase } from "lodash";
import {
  Resource,
  AbstractInstanceType,
  SchemaList,
  ReadShape,
  Method
} from "rest-hooks";
import request from "superagent";

function deeplyApplyKeyTransform(obj: any, transform: (key: string) => string) {
  const ret: any = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach(key => {
    if (obj[key] != null && typeof obj[key] === "object") {
      ret[transform(key)] = deeplyApplyKeyTransform(obj[key], transform);
    } else {
      ret[transform(key)] = obj[key];
    }
  });
  return ret;
}

/** Impelements the common functionality for all Resources we'll make */
export default abstract class BaseResource extends Resource {
  static fromJS<T extends typeof Resource>(
    this: T,
    props: Partial<AbstractInstanceType<T>>
  ): AbstractInstanceType<T> {
    delete (props as any).url;
    return super.fromJS(props) as any;
  }

  static async fetch<T extends typeof Resource>(
    this: T,
    method: Method = "get",
    url: string,
    body?: object | string
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

  /** Shape to get a list of entities */
  static listShape<T extends typeof Resource>(this: T) {
    const fetch = async (params: Readonly<object>) => {
      const url = this.listUrl(params as any);
      let req = request["get"](url).on("error", () => {});
      if (this.fetchPlugin) req = req.use(this.fetchPlugin);
      const res = await req;
      let jsonResponse = res.body;
      jsonResponse = {
        link: res.header.link,
        results: jsonResponse
      };
      return deeplyApplyKeyTransform(jsonResponse, camelCase);
    };
    return {
      ...super.listShape(),
      fetch,
      schema: { results: [this.getEntitySchema()], link: "" }
    };
  }
}
