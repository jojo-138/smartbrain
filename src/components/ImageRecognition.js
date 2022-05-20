const ImageRecognition = ({ imageURL,faceBox,boxID }) => {
	const box = faceBox.map((box, i) => {
		const id = boxID[i];
		return (
			<div key={id} className="bounding-box" style={{ top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}/>
		)
	})
	return (
		<div className="flex justify-center">
			<div className="relative">
				<img src={imageURL} alt="" id="imageInput" className="ma3"/>
				<div>
					{box}
				</div> 
			</div>
		</div>
	);
};

export default ImageRecognition;
