import { NgModule } from "@angular/core";
import { 
    MatGridListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
} from "@angular/material";

@NgModule({
    imports: [
        MatGridListModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
    ],
    exports: [
        MatGridListModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}
