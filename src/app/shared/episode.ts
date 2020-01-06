import { Podcast } from '../shared/podcast';

export interface Episode {
    id: number,
    audio: string,
    title: string,
    releaseDate: Date,
    description: string,
    audioLength: number,
    podcast: Podcast;
}
