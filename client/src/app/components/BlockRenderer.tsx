"use client";
import React from "react";
import { ALLOWED_ATTRS, ALLOWED_TAGS } from "../lib/types";

type NodeLike =
  | string
  | {
      type: string;
      props?: Record<string, unknown>;
      children?: NodeLike[];
    };

function mapProps(props?: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  if (!props) return out;
  Object.keys(props).forEach((k) => {
    if (!ALLOWED_ATTRS.has(k)) return;
    const v = props[k] as unknown;
    if (v === undefined || v === null) return;
    if (k === "style") {
      (out as Record<string, unknown>)[k] = Object.fromEntries(
        (v as string)
          .split(";")
          .filter(Boolean)
          .map((rule) => {
            const idx = rule.indexOf(":");
            if (idx === -1) return [rule.trim(), ""];
            const key = rule.slice(0, idx).trim();
            const value = rule.slice(idx + 1).trim();
            return [key, value];
          })
      );
    } else if (k === "class") {
      (out as Record<string, unknown>)["className"] = v;
    } else {
      (out as Record<string, unknown>)[k] = v;
    }
  });
  return out;
}

function renderNode(node?: NodeLike | NodeLike[]): React.ReactNode {
  if (node === undefined || node === null) return null;
  if (Array.isArray(node))
    return node.map((n, i) => (
      <React.Fragment key={i}>{renderNode(n)}</React.Fragment>
    ));
  if (typeof node === "string") return node;

  const { type, props, children } = node;
  const tag =
    typeof type === "string"
      ? type.toLowerCase().trim()
      : String(type).toLowerCase();

  if (!ALLOWED_TAGS.has(tag)) {
    return null;
  }

  const safeProps = mapProps(props);
  const childNodes = (children || []).map((c, i) => (
    <React.Fragment key={i}>{renderNode(c)}</React.Fragment>
  ));
  return React.createElement(
    tag,
    safeProps,
    childNodes.length ? childNodes : undefined
  );
}

export default function BlockRenderer({ blocks }: { blocks?: unknown }) {
  if (!blocks) return null;
  let parsed: unknown = blocks;
  if (typeof blocks === "string") {
    try {
      parsed = JSON.parse(blocks);
    } catch {
      return <div className="space-y-6">{blocks}</div>;
    }
  }

  let root: NodeLike;
  if (Array.isArray(parsed)) {
    root = { type: "div", props: {}, children: parsed as NodeLike[] };
  } else {
    root = parsed as NodeLike;
  }

  return <div className="space-y-6">{renderNode(root)}</div>;
}
