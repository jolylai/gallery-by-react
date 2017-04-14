/**
 * Created by Jolylai on 2017/3/27.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import ImgFigure from './ImgFigure';
import ControllerUnits from './ControllerUnits';
import Login from './Login'
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

function getRangeRandom(low,high){
  return Math.ceil(Math.random() * (high - low) + low);
}

function get30DegRandom(){
  return ((Math.random() > 0.5 ? '' : '-') + Math.random() * 30);
}




var Stage = React.createClass({
  Constant: {
    centerPos: {
      left: 0,
      top: 0
    },
    //水平方向取值范围
    hPosRange:{
      leftSecX:[0, 0],
      rightSecX:[0, 0],
      y:[0,0]
    },
    //垂直方向取值范围
    vPosRange:{
      x:[0,0],
      topY:[0 , 0]
    }
  },
  /*
   * 利用rearrange函数，居中对应index图片
   * @param index，需要被居中的图片对应的图片信息数组的index值
   * @return {Function} 闭包函数 return一个真正待被执行的函数
   */
  inverse: function(index){
    return function(){
      var imgsRangeArr = this.state.imgsRangeArr;
      imgsRangeArr[index].isInverse = !imgsRangeArr[index].isInverse;
      this.setState({
        imgsRangeArr: imgsRangeArr
      });
    }.bind(this);
  },
  rearRange: function(centerIndex){
    var imgsRangeArr = this.state.imgsRangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
    // vPosRangeX = vPosRange.x,
      vPosRangeTopY = vPosRange.topY,

      imgsRangeTopArr = [],
    // 上部取一个或者不取
    // topImgNum = Math.floor(Math.random() * 2),
      topImgNum = 0,
      topImgSpliceIndex = 0,

      imgsArrangeCenterArr = imgsRangeArr.splice(centerIndex,1);

    // 居中centerIndex 的图片
    imgsArrangeCenterArr[0]={
      pos: centerPos,
      rotate:0,
      isCenter:true
    };
    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (
      imgsRangeArr.length - topImgNum));
    imgsRangeTopArr = imgsRangeArr.splice(topImgSpliceIndex,topImgNum);
    // 布局上侧的图片
    imgsRangeTopArr.forEach(function(value,index){
      imgsRangeTopArr[index].pos = {
        top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
        left:getRangeRandom(hPosRange[0],vPosRange[1])
      }
    });
    // 布局左右两侧的图片
    for (var i = 0,j = imgsRangeArr.length,k = j/2; i < j; i++) {
      var hPosRangeLORX =null;
      if (i<k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      }else{
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsRangeArr[i] = {
        pos:{
          top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter:false
      }
    }
    if (imgsRangeTopArr && imgsRangeTopArr[0]) {
      imgsRangeArr.splice(topImgSpliceIndex,0,imgsRangeTopArr[0]);
    }

    imgsRangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

    this.setState({
      imgsRangeArr:imgsRangeArr
    });
  },
  center: function(index){
    return function () {
      this.rearRange(index);
    }.bind(this);
  },
  getInitialState:function(){
    return {
      imgsRangeArr:[],
      //userName:null
    }
  },
  // 组件加载后计算图片位置的范围
  componentDidMount:function(){
    //获取舞台的大小
    var stageDOM = this.refs.stage,
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);
    //  获取figure的大小
    // var figureDOM = this.refs.imgFigure0,
    var figureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      figureW = figureDOM.scrollWidth,
      figureH = figureDOM.scrollHeight,
      halfFigureW = Math.ceil(figureW / 2),
      halfFigureH = Math.ceil(figureH / 2);
    //  计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfFigureW,
      top: halfStageH - halfFigureH
    };
    // console.log(this.Constant.centerPos)
    //  计算左,右图片的排布的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfFigureW,
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfFigureW * 3,
      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfFigureW,
      this.Constant.hPosRange.rightSecX[1] = stageW - halfFigureW,
      this.Constant.hPosRange.y[0] = - halfFigureH,
      this.Constant.hPosRange.y[1] = stageH - halfFigureH,

      //计算上侧区域图片排布位置的取值范围
      this.Constant.vPosRange.topY[0] = -halfFigureH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfFigureH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - figureW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.rearRange(0);
  },
  render: function() {
    var controllerUnits =[],
      imageFigure = [];
    imageDatas.forEach(function(value,index){
      if (!this.state.imgsRangeArr[index]) {
        this.state.imgsRangeArr[index] = {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse: false,
          isCenter: false
        }
      }
      imageFigure.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index} center={this.center(index)} arrange = {this.state.imgsRangeArr[index]} inverse = {this.inverse(index)}/>)
      controllerUnits.push(<ControllerUnits key={index} center={this.center(index)} arrange={this.state.imgsRangeArr[index]} inverse={this.inverse(index)} />)
    }.bind(this));
    return (
      <div className="stage" ref="stage">
        <section className="img-sec">
          {imageFigure}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </div>
    );
  }
});

Stage.defaultProps = {
};

export default Stage;
