import { ALLOWED_ATTRS, ALLOWED_TAGS } from "./types";

type NodeLike =
  | string
  | { type: string; props?: Record<string, string>; children?: NodeLike[] };

function mapAttrs(el: Element): Record<string, string> {
  const props: Record<string, string> = {};
  ALLOWED_ATTRS.forEach((attr) => {
    const val = el.getAttribute(attr);
    if (val) props[attr] = val;
  });
  return props;
}

function extractChildren(el: Element): NodeLike[] {
  const out: NodeLike[] = [];
  el.childNodes.forEach((child) => {
    handleChild(out, child);
  });
  return out;
}

function handleChild(out: NodeLike[], child: ChildNode) {
  if (child.nodeType === Node.TEXT_NODE) {
    const raw = child.textContent;
    if (raw !== null && raw !== undefined) {
      const normalized = raw.replace(/\s+/g, " ");
      if (normalized !== "") out.push(normalized);
    }
  } else if (child.nodeType === Node.ELEMENT_NODE) {
    const childEl = child as Element;
    const tag = childEl.tagName.toLowerCase();
    if (ALLOWED_TAGS.has(tag)) {
      out.push(elementToNode(childEl));
    }
  }
}

function elementToNode(el: Element): NodeLike {
  const tag = el.tagName.toLowerCase();
  const node: {
    type: string;
    props?: Record<string, string>;
    children?: NodeLike[];
  } = {
    type: tag,
  };
  const props = mapAttrs(el);
  if (Object.keys(props).length) node.props = props;
  const children = extractChildren(el);
  if (children.length) node.children = children;
  return node;
}

export function parseHtmlToBlocks(html: string) {
  if (!html) return [];

  try {
    const maybe = JSON.parse(html);
    if (Array.isArray(maybe)) return maybe as NodeLike[];
  } catch (e) {}

  const out: NodeLike[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.body.childNodes.forEach((n) => {
    handleChild(out, n);
  });

  return out;
}
