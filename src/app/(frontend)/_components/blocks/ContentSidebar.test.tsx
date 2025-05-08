import { render, screen } from "@testing-library/react";
import { ContentSidebarBlock } from "./ContentSidebar";
import type { RichTextProps } from "../RichText";

jest.mock("@frontend/_lib/payload", () => ({
  __esModule: true,
  getPayloadInstance: async () => ({
    findByID: async () => ({
      id: "abc123",
      name: "John Doe",
      profession: "Therapist",
      photo: null,
      specialisms: [],
      communication_method: "in‑person",
      fee_per_hour: 50,
      therapy_types_offered: [],
      qualifications_and_accreditations: [],
    }),
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

it("renders heading, rich‑text content and therapist card", async () => {
  const mockContent = {} as unknown as RichTextProps;

  const ui = await ContentSidebarBlock({
    heading: "Sidebar Heading",
    content: mockContent,
    highlighted_therapist: "abc123",
  });

  render(ui);

  expect(
    screen.getByRole("heading", { name: /sidebar heading/i })
  ).toBeInTheDocument();

  expect(screen.getByTestId("richtext")).toBeInTheDocument();
  expect(screen.getByTestId("therapist-card")).toBeInTheDocument();
});
