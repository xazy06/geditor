var Label  = function(x1, x2, y1, y2){
  this.Frame = new Frame(x1, x2, y1, y2);
};
Label .prototype = new Shape('Label ');
