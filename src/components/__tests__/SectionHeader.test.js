import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SectionHeader from '../SectionHeader';

afterEach(() => {
  cleanup();
});

test('should render the SectionHeader', () => {
  render(<SectionHeader />);
  const sectionHeaderElement = screen.getByTestId('section-1');
  expect(sectionHeaderElement).toBeInTheDocument();
});
test('should render Home based on the props passed', () => {
  const nav = 0;
  render(<SectionHeader nav={nav} />);
  const sectionHeaderTitle = screen.getByTestId('section-2');
  expect(sectionHeaderTitle).toBeInTheDocument();
  expect(sectionHeaderTitle).toHaveTextContent('Home');
});
test('should render Trending based on the props passed', () => {
  const nav = 1;
  render(<SectionHeader nav={nav} />);
  const sectionHeaderTitle = screen.getByTestId('section-2');
  expect(sectionHeaderTitle).toBeInTheDocument();
  expect(sectionHeaderTitle).toHaveTextContent('Trending');
});
test('should render Popular based on the props passed', () => {
  const nav = 2;
  render(<SectionHeader nav={nav} />);
  const sectionHeaderTitle = screen.getByTestId('section-2');
  expect(sectionHeaderTitle).toBeInTheDocument();
  expect(sectionHeaderTitle).toHaveTextContent('Popular');
});
test('should render Recent based on the props passed', () => {
  const nav = 3;
  render(<SectionHeader nav={nav} />);
  const sectionHeaderTitle = screen.getByTestId('section-2');
  expect(sectionHeaderTitle).toBeInTheDocument();
  expect(sectionHeaderTitle).toHaveTextContent('Recent');
});
test('should render Random based on the props passed', () => {
  const nav = 4;
  render(<SectionHeader nav={nav} />);
  const sectionHeaderTitle = screen.getByTestId('section-2');
  expect(sectionHeaderTitle).toBeInTheDocument();
  expect(sectionHeaderTitle).toHaveTextContent('Random');
});
test('should match snapshot', () => {
  const nav = 0;
  const tree = renderer.create(<SectionHeader nav={nav} />).toJSON();
  expect(tree).toMatchSnapshot();
});
