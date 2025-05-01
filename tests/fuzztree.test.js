const globby = require('globby');
const path = require('path');

describe('fuzztree listFiles', () => {
  const testDir = path.join(__dirname, 'testdata');

  test('should list files recursively', async () => {
    const files = await globby(['**/*'], { cwd: testDir, dot: true, gitignore: true });
    expect(files.length).toBeGreaterThan(0);
  });
});
