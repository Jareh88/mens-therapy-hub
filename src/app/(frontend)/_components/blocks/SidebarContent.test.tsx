import { render, screen } from "@testing-library/react";
import { SidebarContentBlock } from "./SidebarContent";
import type { RichTextProps } from "../RichText";

jest.mock("@frontend/_lib/payload", () => ({
  __esModule: true,
  getPayloadInstance: async () => ({
    findByID: async () => ({ id: "abc123", name: "John Doe" }),
  }),
}));
jest.mock("../TherapistCard", () => ({
  __esModule: true,
  default: () => <div data-testid="therapist-card" />,
}));
jest.mock("../RichText", () => ({
  __esModule: true,
  default: ({ data }: { data: unknown }) => (
    <div data-testid="richtext">{JSON.stringify(data)}</div>
  ),
}));

it("renders heading, rich‑text and therapist card", async () => {
  const ui = await SidebarContentBlock({
    heading: "Sidebar heading",
    content: {} as unknown as RichTextProps,
    highlighted_therapist: "abc123",
  });

  render(ui);

  expect(
    screen.getByRole("heading", { name: /sidebar heading/i })
  ).toBeInTheDocument();
  expect(screen.getByTestId("richtext")).toBeInTheDocument();
  expect(screen.getByTestId("therapist-card")).toBeInTheDocument();
});
