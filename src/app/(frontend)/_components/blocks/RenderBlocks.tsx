import React from "react";
import {
  HeroBlock as HeroBlockType,
  ThreeColumnBlock as ThreeColumnBlockType,
  ContentSidebarBlock as ContentSidebarBlockType,
  SidebarContentBlock as SidebarContentBlockType,
  MediaBlock as MediaBlockType,
} from "@/payload-types";

import { HeroBlock as HeroBlockCmp } from "./HeroBlock";
import { ThreeColumnBlock as ThreeColumnCmp } from "./ThreeColumn";
import { ContentSidebarBlock as ContentSidebarCmp } from "./ContentSidebar";
import { SidebarContentBlock as SidebarContentCmp } from "./SidebarContent";
import { MediaBlock as MediaBlockCmp } from "./MediaBlock";

type Block =
  | HeroBlockType
  | ThreeColumnBlockType
  | ContentSidebarBlockType
  | SidebarContentBlockType
  | MediaBlockType;

type UnknownProps = Record<string, unknown>;
type AnyBlockCmp = React.ComponentType<UnknownProps>;
type BlockType = Block["blockType"];

export const blockComponents: Record<BlockType, AnyBlockCmp> = {
  hero: HeroBlockCmp as unknown as AnyBlockCmp,
  "three-column": ThreeColumnCmp as unknown as AnyBlockCmp,
  "content-|-get-matched-and-links":
    ContentSidebarCmp as unknown as AnyBlockCmp,
  "get-matched-and-links-|-content":
    SidebarContentCmp as unknown as AnyBlockCmp,
  mediaBlock: MediaBlockCmp as unknown as AnyBlockCmp,
};

export const RenderBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => (
  <>
    {blocks.map((block, i) => {
      const BlockComponent = blockComponents[block.blockType];
      if (!BlockComponent) return null;
      return (
        <div key={i}>
          <BlockComponent {...(block as unknown as UnknownProps)} />
        </div>
      );
    })}
  </>
);
