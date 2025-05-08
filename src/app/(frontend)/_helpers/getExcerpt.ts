import { type DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

type ParagraphNode = { type: "paragraph"; children?: unknown[] };
const isParagraphNode = (node: unknown): node is ParagraphNode =>
  typeof node === "object" &&
  !!node &&
  (node as ParagraphNode).type === "paragraph";

type TextNode = { text: string };
const hasText = (node: unknown): node is TextNode =>
  typeof (node as { text?: unknown }).text === "string";

export function getExcerpt(
  content: DefaultTypedEditorState | null | undefined,
  maxLength = 200
): string {
  if (!content?.root?.children?.length) return "";

  const firstPara = content.root.children.find(isParagraphNode);
  if (!firstPara?.children) return "";

  // make TypeScript see the refined type
  const textNodes = firstPara.children.filter(hasText) as TextNode[];

  const full = textNodes.map((node) => node.text).join(" ");

  // Truncate if we need, add ellipses
  return full.length > maxLength ? `${full.slice(0, maxLength)}…` : full;
}
