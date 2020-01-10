import { Component, OnInit } from '@angular/core';
import { Highlight } from '../../shared/highlight';
import { HighlightService } from '../../services/highlight.service';
import { Episode } from 'src/app/shared/episode';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-pod-reel-player',
  templateUrl: './pod-reel-player.component.html',
  styleUrls: ['./pod-reel-player.component.scss']
})
export class PodReelPlayerComponent implements OnInit {
  highlights: Highlight[];
  episode: Episode;
  waveReady = false;
  
  constructor(
    private hlService: HighlightService,
    private episodeService: EpisodeService,
  ) { }

  ngOnInit() {
    // Get episode data
    this.highlights = this.hlService.getHighlights(0);
    let episodes = this.episodeService.getEpisode(0);
    if (episodes.length > 0) {
      this.episode = episodes[0];
    }
  }

}
