import { Container } from "react-bootstrap";

const Home = () => {
  return (
    
    <Container>
      <h2>Information</h2>
      <hr />
      <p className="text-mutes  fw-bold fs-lg">
        This Application mainly focuses on the Shopping Cart functionality,
        please refer Store section to understand it's functional overview.
        <ul className="mt-2">
          <li>
            Application is powered by React-Typescript with Bootstrap for
            styling.
          </li>
          <li>Context API for state management</li>
          <li>Local storage for data persistence</li>
        </ul>
      </p>
    </Container>
  );
};

export default Home;
