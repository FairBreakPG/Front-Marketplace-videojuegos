import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProductPage = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);  
      setImagePreview(objectUrl); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      productName,
      price,
      description,
      image,
    };

    console.log('Producto a guardar:', productData);

    setProductName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setImagePreview(null); 
    alert('Producto creado con éxito');
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-75">
        {/* Cuadro de imagen a la izquierda */}
        <div className="col-md-5 d-flex flex-column align-items-center p-4 border bg-secondary text-white">
          <h2 className="mb-4 font-weight-bold">Crear Producto</h2>
          <div className="w-100 h-75 bg-light border d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div className="bg-dark h-2 w-75 mb-2 mx-auto" style={{ height: '4px', width: '100px' }}></div>
              <div className="bg-dark h-2 w-50 mx-auto" style={{ height: '4px', width: '80px' }}></div>
            </div>
          </div>
          <input 
            type="file" 
            className="mt-4 btn btn-secondary"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-3">
              <p>Imagen seleccionada:</p>
              <img src={imagePreview} alt="Vista previa" className="img-fluid" style={{ maxWidth: '200px' }} />
            </div>
          )}
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
            <button type="submit" className="mt-4 btn btn-success">Crear producto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;