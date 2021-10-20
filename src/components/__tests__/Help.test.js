import {render, screen, cleanup} from '@testing-library/react'
import Help from '../Help'

test('should render the Help text', () => {
    render(<Help/>)
    const helpElement = screen.getByTestId('help-1')
    expect(helpElement).toBeInTheDocument();
    expect(helpElement).toHaveTextContent("This is the help page")
})
