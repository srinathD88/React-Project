import { render, screen } from '@testing-library/react'
import ErrorDisplay from '../../src/components/utils/ErrorDisplay'

describe('ErrorDisplay', () => {
    it('should render', () => {
        render(<ErrorDisplay />);
        const elem = screen.getByRole('error-message');
        expect(elem).toBeDefined();
        expect(elem).toHaveTextContent(/Error/i);
    })
})