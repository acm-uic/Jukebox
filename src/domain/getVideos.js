// our video object contains: id, url, title,duration(seconds),plays,likes,skips

export async function getVideoDetails(videoId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&key=${apiKey}&id=${videoId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data)
    if (data.items.length > 0) {
      const video = data.items[0];
      const snippet = video.snippet; // Details from part=snippet ex:title, channel details
      const title = snippet.title;
      const contentDetails = video.contentDetails; // Details from part=contentDetails
      const duration = contentDetails.duration;  // duration recieved in ISO 8601
      // Convert ISO 8601 duration to seconds
      const durationInSeconds = convertISO8601ToSeconds(duration);

      return {id:videoId, title:title, duration: durationInSeconds };
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}

function convertISO8601ToSeconds(iso8601Duration) {
  const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = iso8601Duration.match(durationRegex);
  if (matches) {
    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
}

export function extractVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
