import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";

import { MediaBlock } from "./blocks/MediaBlock";
import type { MediaBlock as MediaBlockProps } from "@/payload-types";

//Converters
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") throw new Error("Expected value object");
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock className="media-block" {...node.fields} />
    ),
  },
});

// Remove content from the built‑in HTML attributes because the DOM has a content="" string attribute.
export interface RichTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  data: DefaultTypedEditorState;
}

export default function RichText({ data, ...divProps }: RichTextProps) {
  return (
    <ConvertRichText
      data={data} // ✅ prop name the lib expects
      converters={jsxConverters}
      {...divProps}
    />
  );
}
