import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

test("renders the Memesfr page", () => {
  render(<App />);
  const linkElement = screen.getByTestId("memesfr");
  expect(linkElement).toBeInTheDocument();
});

// test("test", () => {
//   expect(true).toBe(true);
// });
