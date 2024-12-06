type StreamingPlatform =
  | 'SPOTIFY'
  | 'DEEZER'
  | 'YOUTUBE'
  | 'APPLEMUSIC'
  | 'YOUTUBEMUSIC'
  | 'BOOMPLAY';

interface SingleLink {
  link: string;
  platform: StreamingPlatform;
}

interface Single {
  title: string;
  image: string;
  singleLinks: SingleLink[];
}

interface PlaylistInput {
  title: string;
  description: string;
  image: string;
  author: string;
  singles: Single[];
}

interface Playlist {
  id: string;
  posted: boolean;
  metadata: Metadata;
  playlistInput: PlaylistInput;
}
