import { RouterProvider } from 'react-router-dom';
import { Provider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import router from './routes';

const options = {
	timeout: 5000,
	position: positions.TOP_RIGHT,
};

const App = () => {
	return (
		<Provider template={AlertTemplate} {...options}>
			<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
		</Provider>
	);
};

export default App;
