import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wave: WaveSurfer;
  waveReady = false;
  duration = '00:00';
  counter = '00:00';

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.wave = WaveSurfer.create({
      container: '#waveform',
      progressColor: '#57a260',
      waveColor: '#8e8e8e',
      cursorColor: '#ec407a',
      cursorWidth: 3,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      responsive: true,
      height: 0,
      plugins: [
        CursorPlugin.create({
          container: '#waveform',
          opacity: 1,
          /**
           * hide cursor time until wavesurfer v3.3.0 release
           * github issue #1802
           */
          // showTime: true,
          // followCursorY: true,
          // customShowTimeStyle: {
          //   'background-color': '#000',
          //   'color': '#fff',
          //   'font-size': '12px',
          //   'padding': '0.25em 0.5em'
          // },
          // formatTimeCallback: (sec: number) => {
          //   return this.formatCursorTime(sec);
          // }
        })
      ],
    });
    
    this.wave.on('ready', () => {
      this.waveReady = true;
      this.wave.setHeight(128);
      this.duration = this.getDuration();
      this.cdr.detectChanges();
    });

    this.wave.load('assets/mp3/akshay_nanavati.mp3');
  }

  formatCursorTime(sec: number): string {
    // hh:mm:ss
    return [
      ('00' + Math.floor(sec / 3600)).slice(-2), // hours
      ('00' + Math.floor((sec % 3600) / 60)).slice(-2), // minutes
      ('00' + Math.floor(sec % 60)).slice(-2) // seconds
    ].join(':');
  }

  getDuration(): string {
    return new Date(this.wave.getDuration() * 1000).toISOString().substr(11, 8);
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

  isPlaying(): boolean {
    return this.wave.isPlaying();
  }

}
