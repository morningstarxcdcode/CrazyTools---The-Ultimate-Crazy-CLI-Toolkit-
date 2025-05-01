export function timePlugin() {
  return {
    getSegment() {
      const now = new Date();
      return now.toLocaleTimeString();
    }
  };
}
