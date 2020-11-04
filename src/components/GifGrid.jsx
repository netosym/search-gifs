import React, { useState, useEffect } from 'react';
import GifGridItem from './GifGridItem';
import './styles/GifGrid.css';

const GifGrid = ({ category }) => {
  const [images, setImages] = useState([]);

  const getGifs = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(
      category
    )}&limit=12&api_key=vDERZqeeaTJIuVeRgTOJXeD4q3yqUBxJ`;
    const resp = await fetch(url);
    const { data } = await resp.json();

    const gifs = data.map((image) => {
      return {
        id: image.id,
        title: image.title,
        url: image.images.downsized_medium.url,
      };
    });
    console.log(gifs);
    setImages(gifs);
  };

  useEffect(() => {
    getGifs();
  }, []);

  return (
    <div className="container">
      <h3>{category}</h3>
      <div className="card-grid">
        {images.map((image) => (
          <GifGridItem {...image} key={image.id} />
        ))}
      </div>
    </div>
  );
};

export default GifGrid;
