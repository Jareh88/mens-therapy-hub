import { render, screen } from "@testing-library/react";
import React from "react";
import { MediaBlock, type MediaBlockProps } from "./MediaBlock";

jest.mock("../RichText", () => ({
  __esModule: true,
  default: ({ data }: { data: unknown }) => (
    <div data-testid="richtext">{JSON.stringify(data)}</div>
  ),
}));

const base: MediaBlockProps = {
  media: { url: "/hero.jpg", alt: "hero" },
};

const setup = (over: Partial<MediaBlockProps> = {}) =>
  render(<MediaBlock {...base} {...over} />);

describe("<MediaBlock />", () => {
  it("renders the <Media> image when media exists", () => {
    setup();

    expect(
      screen.getByRole("img", { name: base.media.alt })
    ).toBeInTheDocument();
  });

  it("does not render <img> when media is missing", () => {
    setup({ media: null });
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
