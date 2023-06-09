import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [TotalProductos, setTotalProductos] = useState(0);
  const [TotalPedidos, setTotalPedidos] = useState(0);
  const [IngresosTotales, setIngresosTotales] = useState(0);
  const [PrecioPromedioProductos, setAveragePrice] = useState(0);
  const [ProductosMasVendidos, setProductosMasVendidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        const ordersResponse = await axios.get('https://fakestoreapi.com/orders');

        setTotalProductos(productsResponse.data.length);
        setTotalPedidos(ordersResponse.data.length);

        const ingresos = ordersResponse.data.reduce((total, order) => total + order.total, 0);
        setIngresosTotales(ingresos);

        const precios = productsResponse.data.map((product) => product.precio);
        const promedio = prices.reduce((total, precio) => total + precio, 0) / precios.length;
        setPrecioPromedioProductos(promedio);

        const masVendidos = productsResponse.data.sort((a, b) => b.rating.count - a.rating.count).slice(0, 5);
        setProductosMasVendidos(masVendidos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Panel de Control</h2>

      <div>
        <h3>Métricas:</h3>
        <p>Número total de productos: {TotalProductos}</p>
        <p>Número total de pedidos: {TotalPedidos}</p>
        <p>Ingresos totales generados: {IngresosTotales}</p>
        <p>Precio promedio de los productos: {PrecioPromedioProductos}</p>
      </div>

      <div>
        <h3>Productos más vendidos:</h3>
        <ul>
          {ProductosMasVendidos.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
