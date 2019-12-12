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
    const { warehouseId: selectedWarehouseId = null, productId: selectedProductId = null } = selectedItem;

    const [products, setProducts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        axios.get(PRODUCTS_IN_STOCK_URL)
            .then(({ data: { inStock } }) => {
                setProducts(inStock);
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
                        .sort((a, b) => a.warehouseId - b.warehouseId)
                        .map((product, key) => (
                            <tr key={key} onClick={() => setSelectedItem(product)}
                                className={selectedProductId === product.productId && selectedWarehouseId === product.warehouseId
                                    ? "selected-item"
                                    : null}>
                                <td>{product.warehouseId}</td>
                                <td>{product.productId}</td>
                                <td>{product.dateArrived}</td>
                                <td>{product.dateSent}</td>
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