import React from "react";
import { useParams } from "react-router-dom";
import { guides } from "./guides";

const Guide = () => {
  const { module, guide } = useParams();
  const moduleData = guides[module];
  const guideData = moduleData ? moduleData[guide] : null;

  if (!guideData) {
    return <h2>Guía no encontrada</h2>;
  }

  const { titulo, requerimientos, pasos, imagenes, video } = guideData;

  return (
    <div>
      <h1>{titulo}</h1>
      <h2>Requisitos</h2>
      <ul>
        {requerimientos.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      <h2>Pasos</h2>
      <ol>
        {pasos.map((paso, index) => (
          <li key={index}>{paso}</li>
        ))}
      </ol>
      <h2>Imágenes</h2>
      <div>
        {imagenes.map((src, index) => (
          <img key={index} src={src} alt={`Paso ${index + 1}`} />
        ))}
      </div>
      <h2>Video Tutorial</h2>
      <video controls src={video}></video>
    </div>
  );
};

export default Guide;
