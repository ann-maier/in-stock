import React from "react";
import axios from "axios";

import { PRODUCTS_IN_STOCK_URL } from "../utils/constants";

export const ProductsInStock = ({ selectedItem, setSelectedItem }) => {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        axios.get(PRODUCTS_IN_STOCK_URL)
            .then(({ data: { inStock } }) => {
                setProducts(inStock);
            });
    }, []);

    return products && (
        <>
            <h1>Товары на складе</h1>
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
                            <tr key={key} onClick={() => setSelectedItem(product)}>
                                <td>{product.warehouseId}</td>
                                <td>{product.productId}</td>
                                <td>{product.dateArrived}</td>
                                <td>{product.dateSent}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}