import Container from "../../layout/Container";
import Wrapper from "../../layout/Wrapper";
import "./Footer.css";

const Footer = () => {
  // TODO: Find out start year
  // TODO: Get privacy policy

  const currentYear = new Date().getFullYear();
  const startYear = 2020;

  return (
    <footer className="footer" role="contentinfo">
      <Wrapper className="footer-links-wrapper flex flex-row">
        <Container>Logo</Container>
        <Container>Links</Container>
        <Container>Social</Container>
      </Wrapper>
      <Wrapper className="flex flex-row space-between">
        <Container>
          <small>
            &copy;{" "}
            {startYear === currentYear
              ? currentYear
              : `${startYear}–${currentYear}`}{" "}
            Raise The Roof LLC. All rights reserved.
          </small>
        </Container>
        <Container>
          <a href="#">Privacy Policy</a>
        </Container>
      </Wrapper>
    </footer>
  );
};

export default Footer;
