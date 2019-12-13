import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wave: WaveSurfer;

  waveReady = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public bpObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.wave = WaveSurfer.create({
      container: '#waveform',
      progressColor: '#57a260',
      waveColor: '#8e8e8e',
      cursorColor: '#ec407a',
      cursorWidth: 3,
      barWidth: 2,
      barGap: 2,
      responsive: true
      // plugins: [
      //   TimelinePlugin.create({
      //     container: '#wave-timeline'
      //   }),
      //   CursorPlugin.create({
      //     showTime: true,
      //     opacity: 1,
      //   })
      // ],
    });
    
    this.wave.on('ready', () => {
      this.waveReady = true;
      this.cdr.detectChanges();
    });
    
    this.wave.load('assets/mp3/akshay_nanavati.mp3');

    this.bpObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Matches small viewport or handset in portrait mode');
        } else {
          console.log('Viewport is getting smaller!');
        }
      });
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
