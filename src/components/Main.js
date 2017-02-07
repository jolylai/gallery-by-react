require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
//获取图片相关信息
// var imageDatas = require('../data/imageDatas.json');
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0; i < imageDatasArr.length; i++) {
    var singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatas);
let yeomanImage = require('../images/yeoman.png');

var ImgFigure = React.createClass({
  render: function (){
    return (
      <figure>
        <img/>
        <figcaption>
          <h2></h2>
        </figcaption>
      </figure>
    );
  }
})

class AppComponent extends React.Component {
  render() {

    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
