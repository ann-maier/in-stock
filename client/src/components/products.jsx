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
    const { id: selectedProductId = null } = selectedItem;

    const [products, setProducts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        axios.get(PRODUCTS_URL)
            .then(({ data }) => {
                setProducts(data);
            });
    }, []);

    const deleteProduct = id => {
        axios.delete(`${PRODUCTS_URL}/${id}`)
            .then(() => setProducts(products.filter(({ id: productId }) => productId !== id)));
    }

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
                        .sort((a, b) => a.id - b.id)
                        .map(({ id, type, name, price }) => (
                            <tr key={id}
                                onClick={() => setSelectedItem({ id, type, name, price })}
                                className={selectedProductId === id ? "selected-item" : null}>
                                <td>{id}</td>
                                <td>{type}</td>
                                <td>{name}</td>
                                <td>{price}</td>
                                <td>
                                    <button onClick={() => setShowModal(true)}>Редактировать</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteProduct(id)}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
