const urlParser = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (e) {
    return null;
  }
};

export default urlParser;
