import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProductPage = () => {
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
          <button className="mt-4 btn btn-primary">Cargar Foto</button>
        </div>
        
    
        <div className="col-md-7 p-4 bg-light">
          <form>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Nombre del producto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del producto"
              />
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Precio</label>
              <input
                type="number"
                className="form-control"
                placeholder="Precio"
              />
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Descripción del producto</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Descripción del producto"
              ></textarea>
            </div>
          </form>
          <button className="mt-4 btn btn-success">Crear producto</button>

        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
