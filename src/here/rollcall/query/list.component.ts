import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterState} from '@angular/router';
import {RollcallQueryService} from './query.service';

@Component({
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
})
export class RollcallQueryListComponent {
    adminClasses: any[];
    students: any[];
    max = 20;
    adminClassId: number;
    totalCount: number;
    adminClassMap: {[key: number]: number} = {};

    constructor(
        private service: RollcallQueryService,
        private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.adminClassId = parseInt(params['adminClassId'], 10);
            this.loadData(0);
        });
    }

    loadData(offset: number) {
        if (this.adminClassId) {
            this.service.loadListByAdminClass(this.adminClassId, {offset, max: this.max}).subscribe(data => this.onDataLoaded(data));
        } else {
            this.service.loadList({offset, max: this.max}).subscribe(data => this.onDataLoaded(data));
        }
    }

    onDataLoaded(data: any) {
        this.adminClasses = data.adminClasses;
        this.students = data.students;
        this.totalCount = this.adminClasses.reduce((sum, ac) => sum += ac.count, 0);
        this.adminClasses.forEach(it => this.adminClassMap[it.id] = it.count);
    }

    get count(): number {
        if (this.adminClassId) {
            return this.adminClassMap[this.adminClassId];
        } else {
            return this.totalCount;
        }
    }
}
