var Line = function(x1, x2, y1, y2){
  this.X1 = x1;
  this.X2 = x2;
  this.Y1 = y1;
  this.Y2 = y2;
};
Line.prototype = new Shape('Line');
