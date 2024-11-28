import React, { useContext } from 'react';
import { Carousel, Row, Col, Container, Card, Button } from 'react-bootstrap';
import { ProductosContext } from '../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { agregarAlCarro } from '../services/api';

const MultiItemCarousel = () => {
  const { productos } = useContext(ProductosContext);

  const handleAddToCart = async (producto) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("No se encontró el ID de usuario");
      return;
    }
    try {
      await agregarAlCarro(producto.id, 1); 
      toast.success(`${producto.nombre} agregado al carrito`);
    } catch (error) {
      toast.error('Error al agregar producto al carrito');
    }
  };

  return (
    <Container>
      <Carousel interval={3000}>
        {productos.map((producto) => (
          <Carousel.Item key={producto.id}>
            <Row>
              <Col md={4} className="d-flex align-items-center justify-content-center">
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
                      onClick={() => handleAddToCart(producto)}
                    >
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      <ToastContainer />
    </Container>
  );
};

export default MultiItemCarousel;
