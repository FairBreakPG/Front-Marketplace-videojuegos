import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { crearProducto } from '../../services/api';
const CreateProductPage = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', {
      nombre: productName,
      precio: price,
      descripcion: description,
      imagen: imageUrl,
      descuento: 0, 
      stock: 10, 
      juegosId: 1, 
    });

    const productData = {
      nombre: productName,
      descripcion: description,
      precio: parseFloat(price), 
      descuento: 0, 
      stock: 10, 
      juegosId: 1, 
      imagen: imageUrl, 
    };

    try {
      const response = await crearProducto(productData); 
      console.log('Producto creado:', response);
      alert('Producto creado exitosamente');
      setProductName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      setImagePreview(null);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Error al crear el producto. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-75">
        <div className="col-md-5 d-flex flex-column align-items-center p-4 border bg-secondary text-white">
          <h2 className="mb-4 font-weight-bold">Crear Producto</h2>
          <div className="w-100 h-75 bg-light border d-flex align-items-center justify-content-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Vista previa"
                className="img-fluid"
                style={{ maxWidth: '200px' }}
              />
            ) : (
              <p className="text-center">Ingresa la URL de la imagen para previsualizarla</p>
            )}
          </div>
          <input
            type="text"
            className="mt-4 form-control"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="URL de la imagen"
          />
        </div>
        <div className="col-md-7 p-4 bg-light">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Nombre del producto</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={handleNameChange}
                placeholder="Nombre del producto"
              />
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Precio</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={handlePriceChange}
                placeholder="Precio"
              />
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Descripción del producto</label>
              <textarea
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
                rows="4"
                placeholder="Descripción del producto"
              ></textarea>
            </div>
            <button type="submit" className="mt-4 btn btn-success">
              Crear producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
