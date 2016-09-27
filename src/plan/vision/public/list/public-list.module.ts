import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanCommonModule} from '../../../common/module';
import {VisionPublicListComponent} from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
    ],
    declarations: [
        VisionPublicListComponent,
    ],
    exports: [
        VisionPublicListComponent,
    ],
})
export class VisionPublicListModule {}
