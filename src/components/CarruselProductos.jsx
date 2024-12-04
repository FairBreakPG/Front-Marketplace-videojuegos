import React, { useContext } from 'react';
import { Carousel, Row, Col, Container, Card, Button } from 'react-bootstrap';
import { ProductosContext } from '../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { agregarAlCarro } from '../services/api';

const MultiItemCarousel = () => {
  const { productos } = useContext(ProductosContext); 

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
                      >
                        Agregar al carro
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      <ToastContainer />
    </Container>
  );
};

export default MultiItemCarousel;
