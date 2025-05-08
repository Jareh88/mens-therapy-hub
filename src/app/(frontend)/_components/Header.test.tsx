import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Header } from "./Header";

jest.mock("./NavMenu", () => {
  const { useState } = React;

  return {
    NavMenu: () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          {/* hamburger button */}
          <button data-testid="MenuRoundedIcon" onClick={() => setOpen(true)} />

          {/* mobile drawer appears after click */}
          {open && <aside data-testid="nav-drawer" />}
        </>
      );
    },
  };
});

describe("<Header />", () => {
  it("shows the site logo (link + img)", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  });

  it("renders the main navigation links", () => {
    render(<Header />);

    expect(
      screen.getByRole("button", { name: /resources/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /find your therapist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join the directory/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /about mth/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("opens the mobile drawer when the menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByTestId("MenuRoundedIcon").closest("button");
    expect(menuButton).toBeInTheDocument();

    // drawer should not exist initially
    expect(screen.queryByTestId("nav-drawer")).not.toBeInTheDocument();

    await user.click(menuButton!);

    // after click the mocked drawer appears
    expect(screen.getByTestId("nav-drawer")).toBeInTheDocument();
  });
});
