import React from "react";
import axios from "axios";

import { PRODUCTS_URL } from "../utils/constants";

import { Modal } from "./modal";

const ProductsModal = ({ showModal, setShowModal }) => {
    return (
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
            <p>Products Modal</p>
        </Modal>
    );
}

export const Products = ({ selectedItem, setSelectedItem }) => {
    const { productId: selectedProductId = null } = selectedItem;

    const [products, setProducts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        axios.get(PRODUCTS_URL)
            .then(({ data: { products } }) => {
                setProducts(products);
            });
    }, []);

    return products && (
        <>
            <h1>Товары</h1>
            <ProductsModal showModal={showModal} setShowModal={setShowModal} />
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
                        .sort((a, b) => a.productId - b.productId)
                        .map(({ productId, type, title, price }) => (
                            <tr key={productId}
                                onClick={() => setSelectedItem({ productId, type, title, price })}
                                className={selectedProductId === productId ? "selected-item" : null}>
                                <td>{productId}</td>
                                <td>{type}</td>
                                <td>{title}</td>
                                <td>{price}</td>
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