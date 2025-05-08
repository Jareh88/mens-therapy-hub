import type { Block } from "payload";

export const HeroBlockConfig: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "text" },
    { name: "paragraph", type: "textarea", required: true },
  ],
};

export const ThreeColumnBlockConfig: Block = {
  slug: "three-column",
  interfaceName: "ThreeColumnBlock",
  fields: [
    {
      name: "heading",
      type: "text",
    },
    {
      name: "subheading",
      type: "text",
    },
    {
      label: "Icon Left Column",
      name: "icon_one",
      type: "upload",
      relationTo: "media",
    },
    {
      label: "Title Left Column",
      name: "title_one",
      type: "text",
      required: true,
    },
    {
      label: "Paragraph Left Column",
      name: "paragraph_one",
      type: "textarea",
      required: true,
    },
    {
      label: "URL link / CTA Left Column",
      name: "link_url_one",
      type: "text",
    },
    {
      label: "Icon Centre Column",
      name: "icon_two",
      type: "upload",
      relationTo: "media",
    },
    {
      label: "Title Centre Column",
      name: "title_two",
      type: "text",
      required: true,
    },
    {
      label: "Paragraph Centre Column",
      name: "paragraph_two",
      type: "textarea",
      required: true,
    },
    {
      label: "URL link / CTA Centre Column",
      name: "link_url_two",
      type: "text",
    },
    {
      label: "Icon Right Column",
      name: "icon_three",
      type: "upload",
      relationTo: "media",
    },
    {
      label: "Title Right Column",
      name: "title_three",
      type: "text",
      required: true,
    },
    {
      label: "Paragraph Right Column",
      name: "paragraph_three",
      type: "textarea",
      required: true,
    },
    {
      label: "URL link / CTA Right Column",
      name: "link_url_three",
      type: "text",
    },
  ],
};

export const ContentSidebarBlockConfig: Block = {
  slug: "content-|-get-matched-and-links",
  interfaceName: "ContentSidebarBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "highlighted_therapist",
      type: "relationship",
      relationTo: "therapists",
      required: false,
      hasMany: false,
    },
  ],
};

export const SidebarContentBlockConfig: Block = {
  slug: "get-matched-and-links-|-content",
  interfaceName: "SidebarContentBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "highlighted_therapist",
      type: "relationship",
      relationTo: "therapists",
      required: false,
      hasMany: false,
    },
  ],
};

export const MediaBlockConfig: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
