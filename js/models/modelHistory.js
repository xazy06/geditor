/**
 *
 * @param model
 * @constructor
 * Center
   Тип данных: Piont;
   Назначение: Центральная точка проекции чертежа на экран;
   Scale
   Тип данных: дробное;
   Назначение: масштаб на экране, mm на пиксель;
   Unit
   Тип данных: Units;
   Назначение: единицы измерения, в которых работает пользователь;
   ShowGrid
   Тип данных: булевское;
   Назначение: отображать сетку на экране;
   GridScale
   Тип данных: целое;
   Назначение: Шаг сетки в mm;
   SnapToGrid
   Тип данных: булевское;
   Назначение: привязывать объекты к сетке при редактировании;
   SnapToNearest
   Тип данных: булевское;
   Назначение: привязывать объекты другим ближайшим объектам при редактировании;
   SnapStrength
   Тип данных: целое;
   Назначение: сила привязки в пикселях;
 */

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
