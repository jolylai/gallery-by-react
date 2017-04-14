import React from 'react';

var ControllerUnits = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		e.stopPropagation();
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		}else{
			this.props.center();
		}
	},
	render: function () {
		var navClassName = 'nav-con';
		if(this.props.arrange.isCenter){
			navClassName += ' isCenter'
		}
		if (this.props.arrange.isInverse) {
			navClassName += ' isInverse'
		}
	return (
		<span className={navClassName} onClick={this.handleClick}>
		</span>
		);
	}
});



module.exports = ControllerUnits;
