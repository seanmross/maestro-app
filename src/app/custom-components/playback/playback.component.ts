import { Component, OnInit, Input } from '@angular/core';
import { WaveSurfer } from 'wavesurfer.js';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {
  @Input() waveReady: boolean;
  @Input() wave: WaveSurfer;
  
  constructor() { }

  ngOnInit() {
  }


  onPlayPause() {
    this.wave.playPause();
  }

  onForward() {
    this.wave.skip(5);
  }

  onReplay() {
    this.wave.skip(-5);
  }


}
