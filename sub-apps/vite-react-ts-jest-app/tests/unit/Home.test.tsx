import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import Home from '@/views/home/index';

describe('Home test', () => {
	beforeEach(() => {
		render(<Home />);
	});

	test('renders Home Component', async () => {
		const { container, getByText } = render(<Home />);
		// console.log("getByText:", screen.queryByText(/count is: 1/));

		// 在每一次我们需要判断某个元素不存在时，使用queryBy，除此之外默认使用getBy
		expect(getByText('Vite + Jest + React')).toBeInTheDocument();

		const imgDom = await waitFor(() => container.querySelector('img'));
		expect(imgDom).toBeInTheDocument();
		// 通过debug来查看组件的HTML可见输出
		// screen.debug();

		// fireEvent.change(screen.getByRole('textbox'), {
		//   target: { value: 'Javascript' }
		// });
	});

	// it('should start with custom counter', () => {
	// 	// render(<Home initNum={2} />);
	// 	expect(screen.getByText(/count is: 2/)).toBeInTheDocument();
	// });

	// it('should increment counter on click', async () => {
	// 	expect(screen.getByText('count is: 1')).toBeInTheDocument();
	// 	// fireEvent.click(screen.getByRole('counter'));
	// 	userEvent.click(screen.getByRole('button', { name: 'counter' }));
	// 	expect(await screen.findByText(/count is: 2/i)).toBeInTheDocument();
	// });

	afterEach(cleanup);
});
