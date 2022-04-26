const Rank = ({ name,entries }) => {
	return (
		<div className="mh3">
			<div className="f3 mb2">
				{name}, your current entry count is...
			</div>
			<div className="f1">
				{entries}
			</div>
		</div>
	);
};

export default Rank;