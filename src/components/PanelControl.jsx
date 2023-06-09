import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Metricas from '../Metricas';

const PanelControl = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [precioPromedioProductos, setPrecioPromedioProductos] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      var productsResponse, ordersResponse;
      try {
        axios.get('https://fakestoreapi.com/products').then(res => {
          setTotalProductos(res.data.length);
          productsResponse = res.data;
          let precios = productsResponse.map((product) => product.price);
          let promedio = precios.reduce((total, precio) => total + precio, 0) / productsResponse.length;
          setPrecioPromedioProductos(promedio);
          let masVendidos = productsResponse.sort((a, b) => b.rating.count - a.rating.count).slice(0, 5);
          setProductosMasVendidos(masVendidos);
        });
        axios.get('https://fakestoreapi.com/carts').then(res => {
          setTotalPedidos(res.data.length);
          ordersResponse = res.data;
          console.log(ordersResponse);
          let ingresos = ordersResponse.reduce((total, order) => total + order.total, 0);
          setIngresosTotales(ingresos);
        });
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
      setLoading(false);
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
          <Metricas label="Número total de productos" value={totalProductos} />
          <Metricas label="Número total de pedidos" value={totalPedidos} />
          <Metricas label="Ingresos totales generados" value={ingresosTotales} />
          <Metricas label="Precio promedio de los productos" value={precioPromedioProductos} />
          <Metricas label="Productos más vendidos" data={productosMasVendidos} />
        </>
      )}
    </div>
  );
};

export default PanelControl;
