import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
// import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wave: WaveSurfer;

  waveReady = false;

  constructor() { }

  ngOnInit() {
    this.wave = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'voilet',
      progressColor: 'purple',
      plugins: [
        TimelinePlugin.create({
          container: '#wave-timeline'
        })
      ]
    });
    
    this.wave.on('ready', () => {
      this.waveReady = true;
      console.log('wave ready')
      console.log(this.waveReady)
    });
    
    this.wave.load('assets/mp3/akshay_nanavati.mp3');
  }

  onPlay() {
    this.wave.play();
  }

  onPause() {
    if (this.isPlaying()) {
      this.wave.pause();
    }
  }

  isPlaying(): boolean {
    return this.wave.isPlaying();
  }

}
