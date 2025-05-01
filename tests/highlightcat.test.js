const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

describe('highlightcat CLI', () => {
  const testDir = path.join(__dirname, 'testdata');
  const testFile = path.join(testDir, 'sample.js');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(testFile, 'console.log("Hello World");\\n');
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
    fs.rmdirSync(testDir);
  });

  test('should display highlighted content', (done) => {
    exec(`node ../bin/highlightcat.js ${testFile}`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stdout).toContain('console.log');
      done();
    });
  });

  test('should error on missing file', (done) => {
    exec(`node ../bin/highlightcat.js nonexistingfile.js`, (error, stdout, stderr) => {
      expect(error).not.toBeNull();
      expect(stderr).toContain('Error reading file');
      done();
    });
  });
});
