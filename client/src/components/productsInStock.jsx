import React from "react";
import axios from "axios";

import { PRODUCTS_IN_STOCK_URL } from "../utils/constants";

import { Modal } from "./modal";

const ProductsInStockModal = ({ showModal, setShowModal }) => {
    return (
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
            <p>Products in stock Modal</p>
        </Modal>
    );
}

export const ProductsInStock = ({ selectedItem, setSelectedItem }) => {
    const { id_warehouse: selectedWarehouseId = null, id_product: selectedProductId = null } = selectedItem;

    const [products, setProducts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        axios.get(PRODUCTS_IN_STOCK_URL)
            .then(({ data }) => {
                setProducts(data);
            });
    }, []);

    return products && (
        <>
            <h1>Товары на складе</h1>
            <ProductsInStockModal showModal={showModal} setShowModal={setShowModal} />
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
                        .sort((a, b) => a.id_warehouse - b.id_warehouse)
                        .map((product) => (
                            <tr key={product.id} onClick={() => setSelectedItem(product)}
                                className={selectedProductId === product.id_product && selectedWarehouseId === product.id_warehouse
                                    ? "SelectedItem"
                                    : null}>
                                <td>{product.id_warehouse}</td>
                                <td>{product.id_product}</td>
                                <td>{product.date_arrived}</td>
                                <td>{product.date_sent}</td>
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
