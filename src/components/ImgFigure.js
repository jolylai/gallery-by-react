import React from 'react';
var ImgFigure = React.createClass({
  // 点击处理函数
  handleClick: function (e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  },
  render: function (){
    var styleObj = {};
    // 如果props属性总指定了这张在图片信息，则使用
    if (this.props.arrange.pos) {
      styleObj=this.props.arrange.pos;
    }
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 111;
    }
    // 如果图片的旋转角度有值并且不为0,
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }

    var imgFigureClassnName = 'img-figure';
        imgFigureClassnName += this.props.arrange.isInverse ? ' is-inverse' : '';
    return (
      <figure className={imgFigureClassnName} style={styleObj} onClick ={this.handleClick}>
        <img src={this.props.data.imageURL}
              alt = {this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
});
module.exports = ImgFigure;
