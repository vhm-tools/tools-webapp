import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';

export const Navbar = () => {
	const navigate = useNavigate();
	const alert = useAlert();

	const logout = () => {
		alert.success('Logout successful', {
      timeout: 2000,
			onClose: () => {
				Cookies.remove('token');
				navigate('/auth/login');
			},
		});
	};

	return (
		<div id="sidebar" className="flex items-center">
			<nav>
				<ul>
					<li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						<Link to={`/auth/login`}>Login</Link>
					</li>
					<li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						<Link to={`/banks/create`}>Create bank</Link>
					</li>
					<li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						<Link to={`/banks/create-card`}>Create bank card</Link>
					</li>
					<li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						<Link to={`/customers/create`}>Create customer</Link>
					</li>
					<li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						<Link to={`/banks/transfer`}>Transfer money</Link>
					</li>
					<li className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
						<button onClick={logout}>Logout</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};
