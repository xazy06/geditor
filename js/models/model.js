function Model(model) {
  model = model || {};

  this.Uuid = model.Uuid;
  this.BgColor = model.BgColor;
  this.History = model.History || new ModelHistory()
  this.Items = model.Items || new ModelItem()
}
