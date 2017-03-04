import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

@Injectable()
export class RollcallQueryService {
    indexes: any;
    indexesLoaded = false;
    constructor(
        private rest: Rest,
        private apiUrl: ApiUrl,
        @Inject('ADMIN_CLASS_ROLLCALL_API')
        private adminClassRollcallApi: string,
    ) {}

    loadList(options: {[key: string]: any}) {
        return this.rest.get(this.apiUrl.list(options));
    }

    loadListByAdminClass(id: number, options: {[key: string]: any}): Observable<any> {
        return this.rest.get(this.adminClassRollcallApi.replace('${id}', id.toString()) + '?' + this.apiUrl.buildQueryString(options));
    }
}
