const React = require("react");
const gatsby = jest.requireActual("gatsby");

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: React.forwardRef(function Link({ to, children, ...rest }, ref) {
    return React.createElement("a", { href: to, ref, ...rest }, children);
  }),
  navigate: jest.fn(),
  useStaticQuery: jest.fn(),
  StaticQuery: jest.fn(({ render }) => render({})),
};
