import React from "react";
import axios from "axios";

import { WAREHOUSES_URL } from "../utils/constants";

export const Warehouses = ({ selectedItem, setSelectedItem }) => {
    const [warehouses, setWareHouses] = React.useState([]);

    React.useEffect(() => {
        axios.get(WAREHOUSES_URL)
            .then(({ data: { warehouses } }) => {
                setWareHouses(warehouses);
            });
    }, []);

    return warehouses && (
        <>
            <h1>Склад</h1>
            <table>
                <thead>
                    <tr>
                        <th>Код склада</th>
                        <th>Адрес</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses
                        .sort((a, b) => a.warehouseId - b.warehouseId)
                        .map(({ warehouseId, address }) => (
                            <tr key={warehouseId} onClick={() => setSelectedItem({ warehouseId, address })}>
                                <td>{warehouseId}</td>
                                <td>{address}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}