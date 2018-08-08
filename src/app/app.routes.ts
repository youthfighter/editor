import { Routes } from '@angular/router';
import { MkeditComponent } from './page/mkedit/mkedit.component';

export const appRoutesConfig: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mkedit'
    },
    {
        path: 'mkedit',
        component: MkeditComponent
    }
]