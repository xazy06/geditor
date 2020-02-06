function Font(model) {
  model = model || {};

  this.Color = model.Color;
  this.FontName = model.FontName;
  this.Weight = model.Weight || 400;
  this.Bold = model.Bold || false;
  this.Italic = model.Italic || false;
  this.Underline = model.Underline || false;
}
