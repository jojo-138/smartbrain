import React, { Component } from "react";

class InputBar extends Component {
	handleChange = (event) => {
		this.props.updateInput(event.target.value);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onClickDetectButton();
	}

	render () {
		return (
			<div>
				<p className="mh3 f3 lh-copy">This Magic Brain will detect faces in pictures.</p>
				<p className="mh3 f3 lh-copy nt3" >Give it a try!</p>
				<div className="flex justify-center">
					<form className="pattern br3 shadow-5 ma3 pa3" onSubmit={this.handleSubmit}>
						<input 
							className="w-60 br2 pa2 mv4 fw6 bg-lightest-blue" 
							type="type" 
							name="imageURL"  
							id="imageURL" 
							placeholder="Enter image URL" 
							onChange={this.handleChange}
						/>
						<input 
							className="w-30 br2 pa2 grow white bg-black-90" 
							type="submit" 
							value="Detect"
						/>
					</form>
				</div>
			</div>
		);
	}
	
};

export default InputBar;