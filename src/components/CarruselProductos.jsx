import React, { useContext } from 'react';
import { Carousel, Row, Col, Container, Card, Button } from 'react-bootstrap';
import { ProductosContext } from '../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const MultiItemCarousel = () => {
  const { productosFiltrados, addToCart } = useContext(ProductosContext);
  const itemsPerSlide = 3;

  const groupedItems = productosFiltrados.reduce((acc, product, index) => {
    const groupIndex = Math.floor(index / itemsPerSlide);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(product);
    return acc;
  }, []);

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      toast.error("No se encontró el ID de usuario");
      return; 
    }
  
    addToCart(product, userId); 
    toast.success(`${product.nombre} agregado al carrito!`, { 
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <Container>
      <Carousel interval={3000}>
        {groupedItems.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((product) => (
                <Col key={product.id} md={4} className="d-flex align-items-center justify-content-center">
                  <Card style={{ width: '18rem' }}>
                    <Card.Img
                      variant="top"
                      src={product.imagen}
                      alt={product.nombre}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>
                        <strong>Precio: ${product.precio}</strong>
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={() => handleAddToCart(product)} 
                      >
                        Agregar al carrito
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
