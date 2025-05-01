const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

describe('crazygrep CLI', () => {
  const testDir = path.join(__dirname, 'testdata');
  const testFile = path.join(testDir, 'sample.txt');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(testFile, 'Hello world\\nThis is a test file\\nAnother line with test\\n');
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
    fs.rmdirSync(testDir);
  });

  test('should find matching lines', (done) => {
    exec(`node ../bin/crazygrep.js test ${testDir}`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stdout).toContain('This is a test file');
      expect(stdout).toContain('Another line with test');
      done();
    });
  });

  test('should return no matches for non-existing pattern', (done) => {
    exec(`node ../bin/crazygrep.js nomatch ${testDir}`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stdout).not.toContain('This is a test file');
      done();
    });
  });
});
