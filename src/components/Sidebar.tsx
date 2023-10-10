import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';
import { FaBuffer, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export const Sidebar = () => {
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
		<nav className="w-64 fixed top-0 py-5 left-0 h-screen shadow-lg bg-gray-900">
			<ul className="text-white font-bold">
				<li className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded flex justify-center">
					<SidebarIcon icon={<FaBuffer size={28} />} />
					<Link to={`/mail/builder`} className="ml-2">
						Mail Builder
					</Link>
				</li>
				<li className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded flex justify-center">
					<SidebarIcon icon={<FaSignInAlt size={28} />} />
					<Link to={`/auth/login`} className="ml-2">
						Login
					</Link>
				</li>
				<li className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded flex justify-center">
					<SidebarIcon icon={<FaSignOutAlt size={28} />} />
					<button onClick={logout}>Logout</button>
				</li>
			</ul>
		</nav>
	);
};

const SidebarIcon: FC<{ icon: JSX.Element }> = ({ icon }) => {
	return <div className="sidebar-icon">{icon}</div>;
};
