const NoSleep = jest.fn().mockImplementation(() => ({
  enable: jest.fn().mockResolvedValue(undefined),
  disable: jest.fn(),
}));

module.exports = NoSleep;
module.exports.default = NoSleep;
