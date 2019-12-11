import React from "react";
import axios from "axios";

import { WAREHOUSES_URL } from "../utils/constants";

import { Modal } from "./modal";

const WarehousesModal = ({ showModal, setShowModal }) => {
    return (
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
            <p>Warehouses Modal</p>
        </Modal>
    );
}

export const Warehouses = ({ selectedItem, setSelectedItem }) => {
    const { id_warehouse: selectedWarehouseId = null } = selectedItem;
    console.log(selectedItem)

    const [warehouses, setWareHouses] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        axios.get(WAREHOUSES_URL)
            .then(({ data }) => {
                setWareHouses(data);
            });
    }, []);

    return warehouses && (
        <>
            <h1>Склад</h1>
            <WarehousesModal showModal={showModal} setShowModal={setShowModal} />
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
                            <tr key={id}
                                onClick={() => setSelectedItem({ id_warehouse })}
                                className={selectedWarehouseId === id ? "selected-item" : null}>
                                <td>{id}</td>
                                <td>{address}</td>
                                <td>
                                    <button onClick={() => setShowModal(true)}>Редактировать</button>
                                </td>
                                <td>
                                    <button>Удалить</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
