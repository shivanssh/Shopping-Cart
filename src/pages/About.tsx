import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h1>About</h1>
      <hr />
      <div>
        <h5>Author: Shivansh Singh</h5>
        <p className="text-muted">Github Id: <a href="https://github.com/shivanssh" target="_blank">shivanssh</a></p>
        <p className="text-muted">Refer github for such more projects.</p>
      </div>
    </Container>
  );
};

export default About;
