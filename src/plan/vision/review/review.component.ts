import {Component, ElementRef} from '@angular/core';

import {ApiUrl, Rest} from 'core/rest';
import {ReviewOptions} from 'core/workflow';

import {toVersionString} from '../../shared/utils';
import {Vision} from '../shared/vision.model';
import './review.model';

@Component({
    selector: 'vision-review',
    templateUrl: 'review.component.html',
})
export class VisionReviewComponent {
    id: string;
    wi: string;
    vm: Vision;

    constructor(
        elementRef: ElementRef,
        private rest: Rest,
        private api: ApiUrl) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.wi = elementRef.nativeElement.getAttribute('wi');
        this.rest.get(this.api.workitem(this.id, this.wi)).subscribe(dto => this.onItemLoaded(dto));
    }

    onItemLoaded(dto: any) {
        this.vm = new Vision(dto);
        this.vm.activity = dto.activity;
    }

    get reviewable(): boolean {
        return (this.vm.status === 'SUBMITTED' && this.vm.activity === 'check')
            || (this.vm.status === 'CHECKED' && this.vm.activity === 'approve');
    }

    get title(): string {
        return `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: this.vm.activity,
            what: this.vm.title,
        };
    }
}
