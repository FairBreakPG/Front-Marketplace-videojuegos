import Header from "../components/Header";
import PizzasList from "../components/PizzasList";
import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <Header />
      <PizzasList>
        <Card />
      </PizzasList>
    </>
  );
};

export default Home;
