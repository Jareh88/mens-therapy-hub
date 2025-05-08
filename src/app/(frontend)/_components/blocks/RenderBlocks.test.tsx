import { render, screen } from "@testing-library/react";
import React from "react";
import { RenderBlocks, blockComponents } from "./RenderBlocks";

const Dummy = () => <div data-testid="dummy" />;

beforeEach(() => {
  blockComponents.dummy = Dummy;
});

describe("<RenderBlocks />", () => {
  it("renders the component registered for its blockType", () => {
    render(<RenderBlocks blocks={[{ blockType: "dummy" }]} />);
    expect(screen.getByTestId("dummy")).toBeInTheDocument();
  });

  it("renders nothing for an unknown blockType", () => {
    const { container } = render(
      <RenderBlocks blocks={[{ blockType: "nope" }]} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
