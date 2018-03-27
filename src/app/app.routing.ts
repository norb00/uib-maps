import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { NavigationPageComponent } from './pages/navigation/navigation-page.component';
import { RacersPageComponent } from './pages/racers/racers-page.component';
import { IndexPageComponent } from './pages/index/index-page.component';
import { CheckpointsPageComponent } from './pages/checkpoints/checkpoints-page.component';


export const AppRoutes: Routes = [
    { path: 'index', component: IndexPageComponent },
    { path: 'checkpoints', component: CheckpointsPageComponent },
    { path: 'navigation', component: NavigationPageComponent },
    { path: 'racers', component: RacersPageComponent },
    { path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    { path: '**',
        redirectTo: '/index',
        pathMatch: 'full'
    }
  ];


export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {useHash: true});
