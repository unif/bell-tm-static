import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {Workflow} from 'core/workflow';

import {FreeFormService} from '../form.service';
import {FreeForm} from '../../shared/form.model';
import './form-item.model';
import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import '../../shared/form-viewer.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class FreeFormItemComponent {
    schedules: Schedule[];
    form: FreeForm;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private service: FreeFormService) {
        this.route.params.subscribe(params => {
            this.loadData(parseInt(params['id'], 10));
        });
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
            const checkerSchedules: Schedule[] = dto.checkerSchedules.map((s: ScheduleDto) => new Schedule(s));
            const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s));

            this.form = new FreeForm(dto.form, studentSchedules);
            this.form.editable = dto.form.editable;

            studentSchedules.forEach(it => it.belongsTo = 'student');
            checkerSchedules.forEach(it => it.belongsTo = 'checker');
            departmentSchedules.forEach(it => it.belongsTo = 'department');
            this.schedules = _.concat(studentSchedules, checkerSchedules, departmentSchedules);
        });
    }

    edit() {
        this.router.navigate(['/', this.form.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.form.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    submit() {
        this.workflow.submit(this.form.id, 'approve', this.form.title).then(() => {
            this.loadData(this.form.id);
        }, (error) => {
            alert(error.json().message);
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
