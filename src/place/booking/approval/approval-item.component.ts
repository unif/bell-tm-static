import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions, RevokeOptions} from 'core/workflow';

import {BookingForm} from '../shared/form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class BookingApprovalItemComponent {
    form: BookingForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.form = new BookingForm(dto.form);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'CHECKED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }

    get revokable(): boolean {
        return this.form.status === 'APPROVED';
    }

    get revokeOptions(): RevokeOptions {
        return {
            id: this.form.id,
            what: this.form.title,
        };
    }
}
