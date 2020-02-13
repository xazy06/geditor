function ModelItem(model) {
  model = model || {};

  this.Uuid = model.Uuid;
  this.ClassName = model.ClassName;
  this.Font = model.Font || new Font();
  this.Text = model.Text;
  this.Layer = model.Layer;
  this.Frame = model.Frame || new Frame();
  this.Angle = model.Angle;
  this.FrontColor = model.FrontColor;
  this.BgColor = model.BgColor;
  this.PropValues = model.PropValues || {}

}
