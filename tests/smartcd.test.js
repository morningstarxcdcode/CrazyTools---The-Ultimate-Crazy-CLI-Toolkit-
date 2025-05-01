const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

describe('smartcd CLI', () => {
  const usageFile = path.join(os.homedir(), '.smartcd_usage.json');

  beforeEach(() => {
    if (fs.existsSync(usageFile)) {
      fs.unlinkSync(usageFile);
    }
  });

  test('should add directory usage', (done) => {
    exec(`node ../bin/smartcd.js add ${process.cwd()}`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stdout).toContain('Added usage for directory');
      done();
    });
  });

  test('should list most used directories', (done) => {
    exec(`node ../bin/smartcd.js add ${process.cwd()}`, () => {
      exec(`node ../bin/smartcd.js`, (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stdout).toContain(process.cwd());
        done();
      });
    });
  });
});
