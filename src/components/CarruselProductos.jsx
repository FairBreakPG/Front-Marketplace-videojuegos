import React, { useState, useContext } from 'react';
import { Carousel, Row, Col, Container, Card, Button, Modal } from 'react-bootstrap';
import { ProductosContext } from '../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { agregarAlCarro } from '../services/api';

const MultiItemCarousel = () => {
  const { productos } = useContext(ProductosContext); 

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const agregarAlCarrito = async (producto) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("No se encontró el token de autenticación");
      return;
    }
    console.log('ID del producto:', producto.id)
    try {
      await agregarAlCarro(producto.id, 1);
      toast.success(`${producto.nombre} agregado al carrito`);
    } catch (error) {
      toast.error('Error al agregar producto al carrito');
    }
  };

  const verDescripcion = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const renderizarProductos = [];
  for (let i = 0; i < productos.length; i += 3) {
    renderizarProductos.push(productos.slice(i, i + 3));
  }

  return (
    <Container>
      <Carousel interval={3000}>
        {renderizarProductos.map((grupo, index) => (
          <Carousel.Item key={index}>
            <Row>
              {grupo.map((producto) => (
                <Col md={4} key={producto.id} className="d-flex align-items-center justify-content-center">
                  <Card style={{ width: '18rem' }}>
                    <Card.Img
                      variant="top"
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{producto.nombre}</Card.Title>
                      <Card.Text>
                        <strong>Precio: ${producto.precio}</strong>
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={() => agregarAlCarrito(producto)}
                        className="ml-2"
                      >
                        Agregar al carro
                      </Button>
                      <Button
                        variant="info"
                        onClick={() => verDescripcion(producto)}
                        className="ml-2"
                      >
                        Ver más
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{productoSeleccionado?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Categoría:</strong> {productoSeleccionado?.categoria}</p>
          <p><strong>Descripción:</strong> {productoSeleccionado?.descripcion}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default MultiItemCarousel;
