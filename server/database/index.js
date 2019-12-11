const PRODUCT_TYPE = {
  DRILL: "DRILL",
  SAWS: "SAWS",
  SANDERS: "SANDERS",
  LAMINATE: "LAMINATE",
  WALLPAPER: "WALLPAPER"
};

const WAREHOUSE = new Map([
  [1, "WAREHOUSE ADDRESS 1"],
  [2, "WAREHOUSE ADDRESS 2"],
  [3, "WAREHOUSE ADDRESS 3"],
  [4, "WAREHOUSE ADDRESS 4"],
  [5, "WAREHOUSE ADDRESS 5"]
]);

const PRODUCTS = [
  {
    id: 1,
    type: PRODUCT_TYPE.DRILL,
    title: "Dewalt Drill 18V 1",
    price: 20
  },
  {
    id: 2,
    type: PRODUCT_TYPE.DRILL,
    title: "Dewalt Drill 18V 2",
    price: 18
  },
  {
    id: 3,
    type: PRODUCT_TYPE.LAMINATE,
    title: "Natural Oak Laminate",
    price: 33.03
  },
  {
    id: 4,
    type: PRODUCT_TYPE.SANDERS,
    title: "Mac Allister Corded 160W",
    price: 20
  },
  {
    id: 5,
    type: PRODUCT_TYPE.WALLPAPER,
    title: "GoodHome Ornata Midnight Wallpaper",
    price: 16
  }
];

const PRODUCTS_IN_STOCK = [
  {
    warehouseId: 1,
    productId: PRODUCTS[0].id,
    dateArrived: new Date("December 17, 2019"),
    dateSent: new Date("December 18, 2019")
  },
  {
    warehouseId: 1,
    productId: PRODUCTS[1].id,
    dateArrived: new Date("December 15, 2019"),
    dateSent: new Date("December 20, 2019")
  },
  {
    warehouseId: 2,
    productId: PRODUCTS[2].id,
    dateArrived: new Date("December 5, 2019"),
    dateSent: new Date("December 5, 2019")
  },
  {
    warehouseId: 3,
    productId: PRODUCTS[3].id,
    dateArrived: new Date("December 6, 2019"),
    dateSent: new Date("December 8, 2019")
  },
  {
    warehouseId: 3,
    productId: PRODUCTS[4].id,
    dateArrived: new Date("December 8, 2019"),
    dateSent: new Date("December 10, 2019")
  },
  {
    warehouseId: 4,
    productId: PRODUCTS[4].id,
    dateArrived: new Date("December 10, 2019"),
    dateSent: new Date("December 20, 2019")
  },
  {
    warehouseId: 5,
    productId: PRODUCTS[1].id,
    dateArrived: new Date("December 1, 2019"),
    dateSent: new Date("December 3, 2019")
  }
];
