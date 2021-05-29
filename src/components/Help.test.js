import { render, screen, cleanup } from "@testing-library/react";
import Help from "./Help";

test("should render the dashboard component", () => {
  render(<Help />);
  const helpElement = screen.getByTestId("help");
  expect(helpElement).toBeInTheDocument();
});
