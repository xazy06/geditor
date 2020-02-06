function ModelHistory(model) {
  model = model || {};

  this.Center = model.Center || new Point();
  this.Scale = model.Scale;
  this.Unit = model.Unit || 'MM';
  this.ShowGrid = model.ShowGrid || true;
  this.GridScale = model.GridScale || 2.5;
  this.SnapToGrid = model.SnapToGrid || true;
  this.SnapToNearest = model.SnapToNearest || true;
  this.SnapStrength = model.SnapStrength || 1;
}
