import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { NavigationPageComponent } from './pages/navigation/navigation-page.component';

export const AppRoutes: Routes = [
    { path: 'index', component: NavigationPageComponent },
    { path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    { path: '**',
        redirectTo: '/index',
        pathMatch: 'full'
    }
  ];


export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
