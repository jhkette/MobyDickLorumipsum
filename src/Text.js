async function logFetch() {
    const draculatext = 'dracula.txt';
    try {
      const response = await fetch(draculatext);
      const finalresponse = await response.text();
      return finalresponse;
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

export {logFetch}
