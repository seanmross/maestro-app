import { Injectable } from '@angular/core';
import { Episode } from '../shared/episode';

@Injectable()
export class EpisodeService {

    episodes: Episode[] = [
        {
            id: 0,
            audio: 'assets/mp3/jordan_harbinger_289.mp3',
            title: '289. Akshay Nanavati | Fearvana: Finding Bliss from Suffering',
            releaseDate: new Date('December 12, 2019 00:00:00'),
            description: 'Akshay Nanavati discusses suffering well as detailed in his book Fearvana: The Revolutionary Science of How to Turn Fear into Health, Wealth, and Happiness.',
            audioLength: 4333,
            podcast: {
                id: 0,
                image: 'assets/img/jordan_harbinger_show.png',
                title: 'The Jordan Harbinger Show',
                publisher: 'Jordan Harbinger'
            }
        }
    ];

    getEpisode(id: number): Episode[] {
        return this.episodes.filter( episode => id == episode.id );
    }


}