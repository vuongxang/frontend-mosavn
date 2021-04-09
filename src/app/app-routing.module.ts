import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';
import {CardsComponent} from './DemoPages/Elements/cards/cards.component';
import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
import {IconsComponent} from './DemoPages/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
// import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { CateListComponent } from './views/admin/cate-list/cate-list.component';
import { CateFormComponent } from './views/admin/cate-form/cate-form.component';
import { GalleryListComponent } from './views/admin/gallery-list/gallery-list.component';
import { GalleryFormComponent } from './views/admin/gallery-form/gallery-form.component';
import { ProductListComponent } from './views/admin/product-list/product-list.component';
import { ProductFormComponent } from './views/admin/product-form/product-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginBoxedComponent
  },
  {
    path: 'register',
    component: RegisterBoxedComponent
  },
  //admin
  {
    path: 'admin',
    component: BaseLayoutComponent,
    children: [
      {
        path: '', 
        component: AnalyticsComponent, 
        data: {extraParameter: 'dashboardsMenu'}
      },
      {
        path: 'categories', 
        component: CateListComponent, 
      },
      {
        path: 'add-cate', 
        component: CateFormComponent, 
      },
      {
        path: 'edit-cate/:cateId', 
        component: CateFormComponent,
      },
      {
        path: 'gallery-list', 
        component: GalleryListComponent, 
      },
      {
        path: 'add-gallery', 
        component: GalleryFormComponent, 
      },
      {
        path: 'product-list', 
        component: ProductListComponent, 
      },
      {
        path: 'add-product', 
        component: ProductFormComponent, 
      },
      {
        path: 'edit-product/:proId', 
        component: ProductFormComponent,
      },
    ]
  },
  //client
  {
    path: '',
    component: ClientLayoutComponent,
  },
  // {
  //   path: '',
  //   component: PagesLayoutComponent,
  //   children: [

  //     // User Pages

  //     {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
  //     {path: 'pages/register-boxed', component: RegisterBoxedComponent, data: {extraParameter: ''}},
  //     {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
  //   ]
  // },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
