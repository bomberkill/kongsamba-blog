interface EventInput {
  title: string;
  link: string;
  image: string;
  author: string;
  startAt?: string;
  endAt: string;
}

interface Metadata {
  createdAt: string;
  updatedAt?: string;
}

interface Event {
  id: string;
  posted: boolean;
  eventInput: EventInput;
  metadata: Metadata;
}
