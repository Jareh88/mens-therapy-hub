import { render, screen } from "@testing-library/react";
import React from "react";
import { HeroBlock, type HeroBlockProps } from "./HeroBlock";

const baseProps: HeroBlockProps = {
  heading: "Feel better, starting today",
  paragraph: "Professional support — at your pace, on your terms.",
  subheading: "Backed by experienced therapists",
};

const setup = (overrides: Partial<HeroBlockProps> = {}) => {
  const props = { ...baseProps, ...overrides };
  render(<HeroBlock {...props} />);
  return props;
};

describe("<HeroBlock />", () => {
  it("renders the heading (h2) and paragraph", () => {
    const props = setup();

    // The element is an <h2>, so ARIA level is 2
    expect(
      screen.getByRole("heading", { level: 2, name: props.heading })
    ).toBeInTheDocument();

    expect(screen.getByText(props.paragraph)).toBeInTheDocument();
  });

  it("renders the sub‑heading when provided", () => {
    const props = setup({ subheading: "Tailored to your needs" });
    expect(screen.getByText(props.subheading!)).toBeInTheDocument();
  });

  it("omits the sub‑heading when it isn't supplied", () => {
    setup({ subheading: null });
    expect(
      screen.queryByText(baseProps.subheading as string)
    ).not.toBeInTheDocument();
  });

  it('always renders inside the `<Container>` identified by `data-testid="hero-block"`', () => {
    setup();
    expect(screen.getByTestId("hero-block")).toBeInTheDocument();
  });
});
