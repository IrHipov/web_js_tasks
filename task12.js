/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size {PriceAndCalories}   Размер
 * @param stuffing {PriceAndCalories[]}   Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
  if (!size || !(size instanceof PriceAndCalories) || !size.optionName.startsWith("SIZE_"))
    throw new HamburgerException("Size not found");

  this.size = size;
  this.stuffing = stuffing;

  this.topping = [];
}


/**
 * Класс, с ценой и количеством калорий.
 *
 * @constructor
 * @param optionName          Наименование опции
 * @param price       Стоимость
 * @param calories    Калории
 * @throws {PriceAndCaloriesException}  При неправильной цене или количестве калорий
 */
function PriceAndCalories(optionName, price, calories = 0) {
  if (price < 0 || calories < 0)
    throw new PriceAndCaloriesException("Price or calories incorrect");

  this.optionName = optionName;
  this.price = price;
  this.calories = calories;
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = new PriceAndCalories('SIZE_SMALL', 50, 20);
Hamburger.SIZE_LARGE = new PriceAndCalories('SIZE_LARGE', 100, 40);
Hamburger.STUFFING_CHEESE = new PriceAndCalories('STUFFING_CHEESE', 10, 20);
Hamburger.STUFFING_SALAD = new PriceAndCalories('STUFFING_SALAD', 20, 5);
Hamburger.STUFFING_POTATO = new PriceAndCalories('STUFFING_POTATO', 15, 10);
Hamburger.TOPPING_MAYO = new PriceAndCalories('TOPPING_MAYO', 15, 0);
Hamburger.TOPPING_SPICE = new PriceAndCalories('TOPPING_SPICE', 20, 5);

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping  {PriceAndCalories} Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
  if (!topping || !(topping instanceof PriceAndCalories) || !topping.optionName.startsWith("TOPPING_"))
    throw new HamburgerException("Неправильно задана добавка")

  this.topping.push(topping);
}

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping {PriceAndCalories}  Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
  if (!topping || !(topping instanceof PriceAndCalories) || !topping.optionName.startsWith("TOPPING_"))
    throw new HamburgerException("Неправильно задана добавка")

  let selectedTopping = this.topping.find(item => item.optionName === topping.optionName);

  if (selectedTopping) {
    this.topping.splice(this.topping.indexOf(selectedTopping), 1);
  }
}

/**
 * Получить список добавок.
 *
 * @return {PriceAndCalories[]} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
  return this.topping;
}

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
  return this.size;
}

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
  let priceValue = 0;

  try {
    priceValue += this.size.price;

    this.stuffing?.forEach(stuffing => {
      priceValue += stuffing.price;
    });

    this.topping?.forEach(topping => {
      priceValue += topping.price;
    });
  } catch (e) {
    console.log(e);
    throw new HamburgerException("При расчете цены произошла ошибка");
  }

  return priceValue;
}

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
  let caloriesValue = 0;

  try {
    caloriesValue += this.size.calories;

    this.stuffing?.forEach(stuffing => {
      caloriesValue += stuffing.calories;
    });

    this.topping?.forEach(topping => {
      caloriesValue += topping.calories;
    });
  } catch (e) {
    console.log(e);
    throw new HamburgerException("При расчете калорий произошла ошибка");
  }

  return caloriesValue;
}

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException(message) {
  this.name = "HamburgerException";
  this.message = message ? message : "Ошибка в ходе работы с гамбургером";
}

/**
 * Представляет информацию об ошибке в ходе работы с ценами и калориями.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function PriceAndCaloriesException(message) {
  this.name = "PriceAndCaloriesException";
  this.message = message ? message : "Ошибке в ходе работы с ценами и калориями";
}
