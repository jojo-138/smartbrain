import React, { Component } from "react";

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isSignedIn: null,
		}
	}

	handleChange = (event) => {
		const name = event.target.name;
      	const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(res => res.json())
		.then(res => {
			if (res.id) {
				this.props.onRouteChange('home');
				this.props.updateUser(res);
				this.setState({ isSignedIn: true });
			} else {
				this.props.onRouteChange('signin');
				this.setState({ isSignedIn: false });
			}
		})
		.catch(err => console.log('Error with server connection.', err))
	}

	render () {
		return (
			<article className="br3 shadow-5 ba dark-gray b--black-10 mw5 center">
				<main className="pa4 black-80">
				<form className="measure center" onSubmit={this.handleSubmit}>
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0">Sign In</legend>
					<div className="mt3">
						<label className="db fw6 f6" htmlFor="email">Email</label>
						<input 
							className="tracked pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="email" 
							name="email"  
							id="email" 
							value={this.state.email}
							onChange={this.handleChange} 
							required
						/>
					</div>
					<div className="mv3">
						<label className="db fw6 f6" htmlFor="password">Password</label>
						<input 
							className="tracked b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="password" 
							minLength="8" 
							name="password"  
							id="password" 
							value={this.state.password}
							onChange={this.handleChange}
							required
						/>
					</div>
					{this.state.isSignedIn === false
					  	? 
							<div className="red f6 pb2">
								Incorrect email/password.
							</div>
						: 
							null}
					</fieldset>
					<div>
					<input 
						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						type="submit" 
						value="Sign in" 
					/>
					</div>
					<div className="mt3">
					<div className="f6 link dim black pointer" onClick={() => this.props.onRouteChange('register')}>Register</div>
					</div>
				</form>
				</main>
			</article>
		);
	}
};

export default Signin;