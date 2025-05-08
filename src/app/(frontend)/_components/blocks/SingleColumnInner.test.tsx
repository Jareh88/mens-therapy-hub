import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { SingleColumnInner, SingleColumnInnerProps } from "./SingleColumnInner";

jest.mock("../RichText", () => ({
  __esModule: true,
  default: ({ data }: { data: unknown }) => (
    <div data-testid="richtext">{JSON.stringify(data)}</div>
  ),
}));

const base: SingleColumnInnerProps = {
  title: "One column",
  paragraph: "All the text",
};

const setup = (p: Partial<SingleColumnInnerProps> = {}) =>
  render(<SingleColumnInner {...base} {...p} />);

describe("<SingleColumnInner />", () => {
  it("shows title and paragraph", () => {
    setup();

    expect(
      screen.getByRole("heading", { name: base.title })
    ).toBeInTheDocument();
    expect(screen.getByText(base.paragraph)).toBeInTheDocument();
  });
});
