import React from "react";
import axios from "axios";

import { PRODUCTS_URL } from "../utils/constants";

import { Modal } from "./modal";

const ProductsModal = ({ id, showModal, setShowModal, handleSubmit }) => {
  const [type, setType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);

  return (
    <Modal
      show={showModal}
      handleClose={() => setShowModal(false)}
      handleSumit={() => {
        handleSubmit(id, type, title, price);
        setShowModal(false);
      }}
    >
      <section>
        <div>
          <div>
            <label htmlFor='type'>Введите тип товара:</label>
          </div>
          <input
            type='text'
            name='type'
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='title'>Введите название:</label>
          </div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='price'>Введите цену:</label>
          </div>
          <input
            type='number'
            name='price'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
      </section>
    </Modal>
  );
};

export const Products = ({ selectedItem, setSelectedItem }) => {
  const { product_id: selectedProductId = null } = selectedItem;

  const [products, setProducts] = React.useState([]);
  const [maxIndex, setMaxIndex] = React.useState(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const getProducts = () => {
    axios.get(PRODUCTS_URL).then(({ data }) => {
      setProducts(data);
      setMaxIndex(data[data.length - 1].id);
    });
  };

  const deleteProduct = id => {
    axios
      .delete(`${PRODUCTS_URL}/${id}`)
      .then(({ data }) => {
        if (data.name === "SequelizeForeignKeyConstraintError") {
          throw new Error();
        }

        setProducts(products.filter(({ id: productId }) => productId !== id));
      })
      .catch(() =>
        alert(
          "Cannot delete or update a parent row: a foreign key constraint fails."
        )
      );
  };

  const updateProduct = (id, type, title, price) => {
    axios
      .put(`${PRODUCTS_URL}/${id}`, {
        type,
        title,
        price
      })
      .then(() =>
        setProducts(
          products.map(product =>
            product.id === id ? { ...product, type, title, price } : product
          )
        )
      );
  };

  const addProduct = (id, type, title, price) => {
    axios
      .post(`${PRODUCTS_URL}`, {
        id,
        type,
        title,
        price
      })
      .then(() => getProducts());
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    products && (
      <>
        <h1>Товары</h1>
        <section>
          <button onClick={() => setShowAddModal(true)}>
            Добавить новый товар
          </button>
        </section>
        <br />
        <ProductsModal
          id={selectedProductId}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          handleSubmit={updateProduct}
        />
        <ProductsModal
          id={maxIndex + 1}
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          handleSubmit={addProduct}
        />
        <table>
          <thead>
            <tr>
              <th>Код товара</th>
              <th>Тип товара</th>
              <th>Название</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {products
              .sort((a, b) => a.id - b.id)
              .map(({ id, type, name, price }) => (
                <tr
                  key={id}
                  onClick={() => setSelectedItem({ product_id: id })}
                  className={selectedProductId === id ? "selected-item" : null}
                >
                  <td>{id}</td>
                  <td>{type}</td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>
                    <button onClick={() => setShowEditModal(true)}>
                      Редактировать
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(id)}>Удалить</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )
  );
};
