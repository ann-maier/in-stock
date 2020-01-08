import React from "react";
import axios from "axios";

import { WAREHOUSES_URL } from "../utils/constants";

import { Modal } from "./modal";

const WarehousesModal = ({ id, showModal, setShowModal, handleSubmit }) => {
  const [address, setAddress] = React.useState("");

  return (
    <Modal
      show={showModal}
      handleClose={() => setShowModal(false)}
      handleSumit={() => {
        handleSubmit(id, address);
        setShowModal(false);
      }}
    >
      <section>
        <div>
          <label htmlFor='address'>Введите адрес склада:</label>
        </div>
        <input
          type='text'
          name='address'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </section>
    </Modal>
  );
};

export const Warehouses = ({ selectedItem, setSelectedItem }) => {
  const { warehouse_id: selectedWarehouseId = null } = selectedItem;

  const [warehouses, setWareHouses] = React.useState([]);
  const [maxIndex, setMaxIndex] = React.useState(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const getWarehouses = () => {
    axios.get(WAREHOUSES_URL).then(({ data }) => {
      setWareHouses(data);
      setMaxIndex(data[data.length - 1].id);
    });
  };

  const deleteWarehouse = id => {
    axios.delete(`${WAREHOUSES_URL}/${id}`).then(() => {
      setWareHouses(
        warehouses.filter(({ id: warehouseId }) => warehouseId !== id)
      );
      alert("Warehouse is successfully deleted! Please, reload the page.");
    });
  };

  const updateWarehouse = (id, address) => {
    axios
      .put(`${WAREHOUSES_URL}/${id}`, {
        address
      })
      .then(() =>
        setWareHouses(
          warehouses.map(warehouse =>
            warehouse.id === id ? { ...warehouse, address } : warehouse
          )
        )
      );
  };

  const addWarehouse = (id, address) => {
    axios
      .post(`${WAREHOUSES_URL}`, {
        id,
        address
      })
      .then(() => getWarehouses());
  };

  React.useEffect(() => {
    getWarehouses();
  }, []);

  return (
    warehouses && (
      <>
        <h1>Склад</h1>
        <section>
          <button onClick={() => setShowAddModal(true)}>
            Добавить новый склад
          </button>
        </section>
        <br />
        <WarehousesModal
          id={selectedWarehouseId}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          handleSubmit={updateWarehouse}
        />
        <WarehousesModal
          id={maxIndex + 1}
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          handleSubmit={addWarehouse}
        />
        <table>
          <thead>
            <tr>
              <th>Код склада</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {warehouses
              .sort((a, b) => a.id - b.id)
              .map(({ id, address }) => (
                <tr
                  key={id}
                  onClick={() => setSelectedItem({ warehouse_id: id })}
                  className={
                    selectedWarehouseId === id ? "selected-item" : null
                  }
                >
                  <td>{id}</td>
                  <td>{address}</td>
                  <td>
                    <button onClick={() => setShowEditModal(true)}>
                      Редактировать
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteWarehouse(id)}>Удалить</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )
  );
};
