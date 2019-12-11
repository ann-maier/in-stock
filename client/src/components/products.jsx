import React from "react";
import axios from "axios";

import { PRODUCTS_URL } from "../utils/constants";

export const Products = ({ selectedItem, setSelectedItem }) => {
    const [products, setProducts] = React.useState([]);
    const { productId: selectedProductId = null } = selectedItem

    React.useEffect(() => {
        axios.get(PRODUCTS_URL)
            .then(({ data: { products } }) => {
                setProducts(products);
            });
    }, []);

    return products && (
        <>
            <h1>Товары</h1>
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
                                className={selectedProductId === productId ? "SelectedItem" : null}>
                                <td>{productId}</td>
                                <td>{type}</td>
                                <td>{title}</td>
                                <td>{price}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}