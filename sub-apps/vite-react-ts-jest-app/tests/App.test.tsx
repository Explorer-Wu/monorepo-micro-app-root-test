import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '@/App';
import React from 'react';

describe('App', () => {
	// beforeEach(() => {
	// 	render(<App />);
	// });

	it('test App', () => {
		const app = render(<App />);
		expect(app).toMatchSnapshot();
		document.getElementById('subreact-app');
		// expect(screen.getByText('My favorite fruit is banana')).toBeInTheDocument();
		// expect(screen.getByRole('heading').textContent).toBe('Vite + Vitest + React');
	});

	afterEach(cleanup);
});
