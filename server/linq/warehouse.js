class Warehouse {
  constructor(id, address, itemsInStock) {
    this.id = id;
    this.address = address;
    this.itemsInStock = itemsInStock;
  }
}

const warehouses = [
  new Warehouse(3, "WAREHOUSE ADDRESS 3", 10),
  new Warehouse(2, "WAREHOUSE ADDRESS 2", 3),
  new Warehouse(1, "WAREHOUSE ADDRESS 1", 2),
  new Warehouse(4, "WAREHOUSE ADDRESS 4", 25),
  new Warehouse(5, "WAREHOUSE ADDRESS 5", 33)
];

const squareNumber = number => Math.pow(number, 2);

const cubeNumber = number => Math.pow(number, 3);

const smallSortedWarehouses = warehouses
  .sort((a, b) => a.itemsInStock - b.itemsInStock)
  .filter(({ itemsInStock }) => itemsInStock <= 20);

const warehousesWithSquaredAndCubedItems = warehouses
  .map(({ itemsInStock }) => squareNumber(itemsInStock))
  .map(number => cubeNumber(number));

console.log("Маленькие склады: ", smallSortedWarehouses);
console.log(warehousesWithSquaredAndCubedItems);
