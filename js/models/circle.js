var Circle = function(x, y, radius){
  this.X = x || 0;
  this.Y = y || 0;
  this.Radius = radius || 1
};
Circle.prototype = new Shape('Circle');
