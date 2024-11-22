import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col, Container, Card } from 'react-bootstrap';

const MultiItemCarousel = () => {
  const [products, setProducts] = useState([]);
  const itemsPerSlide = 3;

  useEffect(() => {
    fetch('./productos.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  const groupedItems = products.reduce((acc, product, index) => {
    const groupIndex = Math.floor(index / itemsPerSlide);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(product);
    return acc;
  }, []);

  return (
    <Container>
      <Carousel interval={3000}>
        {groupedItems.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((product) => (
                <Col key={product.id} md={4} className="d-flex align-items-center justify-content-center">
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.img} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        <strong>Precio: ${product.price}</strong>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      
      </Carousel>
    </Container>
  );
};

export default MultiItemCarousel;
