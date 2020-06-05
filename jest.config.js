module.exports = {

  // Set component root source files
  roots: [ './src' ],

  // Launch the setup after start
  setupFilesAfterEnv: [ './jest.setup.ts' ],

  // Look for typescript extension
  moduleFileExtensions: [ 'ts', 'tsx', 'js' ],

  // Ignore module dependencies
  testPathIgnorePatterns: [ 'node_modules/' ],

  // Transform typescript file
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Match only test files
  testMatch: [ '**/*.test.(ts|tsx)' ],

  // Mocks out all these file formats when tests are run
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$'                                                               : 'identity-obj-proxy'
  }

};
