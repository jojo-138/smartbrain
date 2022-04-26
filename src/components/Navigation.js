import logo from './logo.png';

const Navigation = ({ onRouteChange,currentRoute }) => {
	return (
		<div className="flex justify-between mh3">
			<div className="logo">
				<img src={ logo } alt=""/>
			</div>
			{
				currentRoute === 'home'
				? <div className="f3-ns fw6 link dim pointer" onClick={() => onRouteChange('signin')}>
					Sign Out
				  </div>
				: <ul>
					<li className="f3-ns fw6 link dim pointer dib mr3" onClick={() => onRouteChange('signin')}>
						Sign In
					</li>
					<li className="f3-ns fw6 link dim pointer dib " onClick={() => onRouteChange('register')}>
						Register
					</li>
				  </ul>
			}
			
		</div>
	);
};

export default Navigation;