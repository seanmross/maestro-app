import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { HighlightReelComponent } from './custom-components/highlight-reel/highlight-reel.component';
import { HighlightService } from './services/highlight.service';
import { PodReelPlayerComponent } from './custom-components/pod-reel-player/pod-reel-player.component';
import { WavesurferComponent } from './custom-components/wavesurfer/wavesurfer.component';
import { ChartComponent } from './chart/chart.component';
import { PlaybackComponent } from './custom-components/playback/playback.component';
import { HighlightListComponent } from './custom-components/highlight-list/highlight-list.component';
import { EpisodeService } from './services/episode.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    HighlightReelComponent,
    PodReelPlayerComponent,
    WavesurferComponent,
    ChartComponent,
    PlaybackComponent,
    HighlightListComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    EpisodeService,
    HighlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
