const React = require("react");

module.exports = {
  GatsbyImage: jest.fn(({ alt, ...props }) =>
    React.createElement("img", { alt, "data-testid": "gatsby-image", ...props })
  ),
  getImage: jest.fn((data) => data ?? null),
  StaticImage: jest.fn(({ alt, ...props }) =>
    React.createElement("img", { alt, ...props })
  ),
};
