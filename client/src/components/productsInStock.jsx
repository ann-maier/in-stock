import React from "react";
import axios from "axios";

import { PRODUCTS_IN_STOCK_URL } from "../utils/constants";

import { Modal } from "./modal";

const ProductsInStockModal = ({
  id,
  showModal,
  setShowModal,
  handleSubmit
}) => {
  const [warehouseId, setWarehouseId] = React.useState(0);
  const [productId, setProductId] = React.useState(0);
  const [dateArrived, setDateArrived] = React.useState("");
  const [dateSent, setDateSent] = React.useState("");

  return (
    <Modal
      show={showModal}
      handleClose={() => setShowModal(false)}
      handleSumit={() => {
        handleSubmit(id, warehouseId, productId, dateArrived, dateSent);
        setShowModal(false);
      }}
    >
      <section>
        <div>
          <div>
            <label htmlFor='warehouseId'>Введите код склада:</label>
          </div>
          <input
            type='number'
            name='warehouseId'
            value={warehouseId}
            onChange={e => setWarehouseId(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='productId'>Введите код товара:</label>
          </div>
          <input
            type='number'
            name='productId'
            value={productId}
            onChange={e => setProductId(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='dateArrived'>Введите дату прибытия:</label>
          </div>
          <input
            type='text'
            name='dateArrived'
            value={dateArrived}
            onChange={e => setDateArrived(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='dateSent'>Введите дату отправки:</label>
          </div>
          <input
            type='text'
            name='dateSent'
            value={dateSent}
            onChange={e => setDateSent(e.target.value)}
          />
        </div>
      </section>
    </Modal>
  );
};

export const ProductsInStock = ({ selectedItem, setSelectedItem }) => {
  const {
    id = null,
    warehouse_id: selectedWarehouseId = null,
    product_id: selectedProductId = null
  } = selectedItem;

  const [products, setProducts] = React.useState([]);
  const [maxIndex, setMaxIndex] = React.useState(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const getProductsInStock = () => {
    axios.get(PRODUCTS_IN_STOCK_URL).then(({ data }) => {
      setProducts(data);
      setMaxIndex(data[data.length - 1].id);
    });
  };

  const deleteProduct = id => {
    axios
      .delete(`${PRODUCTS_IN_STOCK_URL}/${id}`)
      .then(() =>
        setProducts(products.filter(({ id: productId }) => productId !== id))
      );
  };

  const updateProduct = (id, warehouseId, productId, dateArrived, dateSent) => {
    axios
      .put(`${PRODUCTS_IN_STOCK_URL}/${id}`, {
        warehouseId,
        productId,
        dateArrived,
        dateSent
      })
      .then(() => getProductsInStock());
  };

  const addProduct = (id, warehouseId, productId, dateArrived, dateSent) => {
    axios
      .post(`${PRODUCTS_IN_STOCK_URL}`, {
        id,
        warehouseId,
        productId,
        dateArrived,
        dateSent
      })
      .then(() => getProductsInStock());
  };

  React.useEffect(() => {
    getProductsInStock();
  }, []);

  return (
    products && (
      <>
        <h1>Товары на складе</h1>
        <section>
          <button onClick={() => setShowAddModal(true)}>
            Добавить новый товар на складе
          </button>
        </section>
        <br />
        <ProductsInStockModal
          id={id}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          handleSubmit={updateProduct}
        />
        <ProductsInStockModal
          id={maxIndex + 1}
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          handleSubmit={addProduct}
        />
        <table>
          <thead>
            <tr>
              <th>Код склада</th>
              <th>Код товара</th>
              <th>Дата прибытия</th>
              <th>Дата отправки</th>
            </tr>
          </thead>
          <tbody>
            {products
              .sort((a, b) => a.warehouse_id - b.warehouse_id)
              .map(product => (
                <tr
                  key={product.id}
                  onClick={() =>
                    setSelectedItem({
                      id: product.id,
                      product_id: product.product_id,
                      warehouse_id: product.warehouse_id
                    })
                  }
                  className={
                    selectedProductId === product.product_id &&
                    selectedWarehouseId === product.warehouse_id
                      ? "selected-item"
                      : null
                  }
                >
                  <td>{product.warehouse_id}</td>
                  <td>{product.product_id}</td>
                  <td>{product.date_arrived}</td>
                  <td>{product.date_sent}</td>
                  <td>
                    <button onClick={() => setShowEditModal(true)}>
                      Редактировать
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(product.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )
  );
};
