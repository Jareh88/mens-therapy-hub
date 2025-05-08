import { render, screen } from "@testing-library/react";
import React from "react";
import { ThreeColumnBlock } from "./ThreeColumn";

const base = {
  title_one: "A",
  paragraph_one: "Text A",
  title_two: "B",
  paragraph_two: "Text B",
  title_three: "C",
  paragraph_three: "Text C",
};

describe("<ThreeColumnBlock />", () => {
  const renderUI = () => render(<ThreeColumnBlock {...base} />);

  it("renders a heading for each column", () => {
    renderUI();

    [base.title_one, base.title_two, base.title_three].forEach((title) => {
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: new RegExp(`^${title}$`, "i"),
        })
      ).toBeInTheDocument();
    });
  });

  it("renders a paragraph for each column", () => {
    renderUI();

    [base.paragraph_one, base.paragraph_two, base.paragraph_three].forEach(
      (expected) => {
        expect(
          screen.getByText(
            (nodeText) => nodeText.replace(/\u00A0/g, " ").trim() === expected
          )
        ).toBeInTheDocument();
      }
    );
  });
});
