// YouTube URL Format: https://www.youtube.com/watch?v=4idQbwsvtUo
export function parseYoutubeUrl(url: string) {
  const urlRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/gim;
  const isValid = urlRegex.test(url);
  if (isValid) {
    const youtubeId = url.split("v=")[1];
    return youtubeId;
  }
  return "";
}

export function createYoutubeUrl(id: string) {
  return `https://www.youtube.com/embed/${id}`;
}
