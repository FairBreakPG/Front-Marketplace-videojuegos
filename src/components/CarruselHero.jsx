
import Carousel from 'react-bootstrap/Carousel';

function CarruselHero() {
  return (
    <div className='container-fluid'>
      <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
src="../public/assets/Banner1.png"
            alt="Image One"
          />
          
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
src="../public/assets/Banner2.png"
            alt="Image Two"
          />
          
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarruselHero;
