import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Metricas from '../Metricas';

const PanelControl = () => {
  const [TotalProductos, setTotalProductos] = useState(0);
  const [TotalPedidos, setTotalPedidos] = useState(0);
  const [IngresosTotales, setIngresosTotales] = useState(0);
  const [PrecioPromedioProductos, setPrecioPromedioProductos] = useState(0);
  const [ProductosMasVendidos, setProductosMasVendidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        const ordersResponse = await axios.get('https://fakestoreapi.com/carts');

        setTotalProductos(productsResponse.data.length);
        setTotalPedidos(ordersResponse.data.length);

        const ingresos = ordersResponse.data.reduce((total, order) => total + order.total, 0);
        setIngresosTotales(ingresos);

        const precios = productsResponse.data.map((product) => product.precio);
        const promedio = precios.reduce((total, precio) => total + precio, 0) / precios.length;
        setPrecioPromedioProductos(promedio);

        const masVendidos = productsResponse.data.sort((a, b) => b.rating.count - a.rating.count).slice(0, 5);
        setProductosMasVendidos(masVendidos);

        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="control-panel">
      <h2>Panel de Control</h2>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <Metricas label="Número total de productos" value={TotalProductos} />
          <Metricas label="Número total de pedidos" value={TotalPedidos} />
          <Metricas label="Ingresos totales generados" value={IngresosTotales} />
          <Metricas label="Precio promedio de los productos" value={PrecioPromedioProductos} />
          <Metricas label="Productos más vendidos" data={ProductosMasVendidos} />
        </>
      )}
    </div>
  );
};

export default PanelControl;
