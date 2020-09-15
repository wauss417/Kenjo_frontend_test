import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterPreloader } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'artist',
    loadChildren: () => import('./modules/artist/artist.module').then(m => m.ArtistModule),
  },
  {
    path: 'album',
    loadChildren: () => import('./modules/album/album.module').then(m => m.AlbumModule),
  },
  //TODO: añadir ruta y template para errores
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RouterModule
  ]
})

export class AppRoutingModule { }
