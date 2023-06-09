import React from 'react';

const Metricas = ({ label, value, data }) => {
  return (
    <div className="metricas">
      <h3>{label}</h3>
      {value && <p>{value}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Metricas;
