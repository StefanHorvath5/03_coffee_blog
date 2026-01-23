export interface User {
  id: string;
  email: string;
  role: string;
}
export type ContentData = {
  text?: string;
  url?: string;
  caption?: string;
  author?: string;
};

export type ContentBlock = {
  type: string;
  data: ContentData;
};

export interface Post {
  id: string;
  title: string;
  slug?: string;
  content?: ContentBlock[];
  mainImageUrl: string;
  metaDescription: string;
  sources: string;
  hashtags: string;
  hidden?: boolean;
  numOfViews?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum Roles {
  ADMIN = "admin",
  user = "user",
}

export const ALLOWED_TAGS = new Set([
  "p",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "img",
  "strong",
  "em",
  "small",
  "code",
  "pre",
  "figure",
  "figcaption",
  "picture",
  "source",
  "ol",
  "br",
  "nav",
  "button",
  "input",
  "label",
  "form",
  "textarea",
  "select",
  "option",
  "i",
  "u",
  "del",
  "ins",
  "sup",
  "sub",
  "mark",
  "time",
  "dl",
  "dt",
  "dd",
  "details",
  "summary",
  "link",
  "meta",
  "svg",
  "path",
  "video",
  "audio",
  "iframe",
  "embed",
  "object",
  "param",
  "map",
  "area",
  "canvas",
  "kbd",
  "s",
  "a",
  "article",
  "header",
  "section",
  "aside",
  "main",
  "blockquote",
  "ul",
  "li",
  "span",
  "table",
  "th",
  "td",
  "b",
  "hr",
]);

export const ALLOWED_ATTRS = new Set([
  "alt",
  "src",
  "srcset",
  "sizes",
  "class",
  "id",
  "className",
  "placeholder",
  "title",
  "width",
  "height",
  "style",
  "loading",
  "role",
  "href",
  "target",
  "rel",
  "aria-hidden",
  "aria-label",
  "aria-describedby",
  "aria-labelledby",
  "aria-live",
  "aria-expanded",
  "aria-pressed",
  "aria-checked",
  "name",
  "content",
  "charset",
  "type",
  "integrity",
  "crossorigin",
  "referrerpolicy",
  "decoding",
  "allowfullscreen",
  "frameborder",
  "sandbox",
  "allow",
  "method",
  "action",
  "novalidate",
  "required",
  "autocomplete",
  "value",
  "min",
  "max",
  "step",
  "multiple",
  "checked",
  "selected",
  "for",
  "form",
  "accept",
  "enctype",
  "media",
  "http-equiv",
  "property",
  "itemprop",
  "itemscope",
  "itemtype",
  "itemid",
  "viewBox",
  "viewbox",
  "srcdoc",
  "poster",
  "preload",
  "controls",
  "playsinline",
  "spellcheck",
  "contenteditable",
  "hidden",
]);
