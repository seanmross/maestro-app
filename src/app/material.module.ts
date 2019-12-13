import { NgModule } from "@angular/core";
import { 
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
} from "@angular/material";


@NgModule({
    imports: [
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
    ],
    exports: [
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}
