var Rectangle = function(x1, x2, y1, y2){
  this.Frame = new Frame(x1, x2, y1, y2);
};
Rectangle.prototype = new Shape('Rectangle');
