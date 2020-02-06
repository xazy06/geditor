/**
 * Свойство объекта, связанное с его бизнес-применением
 */
var ObjectProp = function (model) {

  model = model || {};

  // String
  this.DisplayName = model.DisplayName;

  //String
  this.PropName = model.PropName;

  //String
  this.GroupName = model.GroupName;

  //String
  this.PropType = model.PropType;

  //ExternalMethod
  this.DataSource = model.DataSource || new ExternalMethod();

  //ExternalMethod
  this.OnChange = model.OnChange || new ExternalMethod();
};
