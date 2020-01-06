export class Highlight {
    id: number;
    episodeId: number; // Primary key on Episode
    timeStart: number; // Time in seconds
    timeEnd: number; // Time in seconds
    text: string; // maxLength = 220 chars
}