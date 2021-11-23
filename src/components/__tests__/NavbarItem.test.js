import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NavbarItem from '../NavbarItem';

afterEach(() => {
  cleanup();
});

test('should render the NavbarItem component', () => {
  render(<NavbarItem />);
  const sectionHeaderElement = screen.getByTestId('section-1');
  expect(sectionHeaderElement).toBeInTheDocument();
});

test('should render the props in NavbarItem component', () => {
  const icon = '🔥';
  render(<NavbarItem icon={icon} />);
  const sectionHeaderElement = screen.getByTestId('section-1');
  expect(sectionHeaderElement).toHaveTextContent(icon);
});

test('should match snapshot', () => {
  const icon = '🔥';
  const tree = renderer.create(<NavbarItem icon={icon} />).toJSON();
  expect(tree).toMatchSnapshot();
});
