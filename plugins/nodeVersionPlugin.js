import { execSync } from 'child_process';

export function nodeVersionPlugin() {
  return {
    getSegment() {
      try {
        const version = execSync('node -v', { encoding: 'utf8' }).trim();
        return `Node ${version}`;
      } catch {
        return '';
      }
    }
  };
}
