import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './categories.service';

import { AuthorsComponent } from './authors/authors.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ArchivedComponent } from './archived/archived.component';
import { AuthorsService } from './authors.service';
import { BlogsService } from './blogs.service';
import { LoginService } from './login.service';
import { ArchivedService } from './archived.service';
import { RegisterComponent } from './register/register.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'archived', component: ArchivedComponent }
    ]
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'createCategory',
    component: CreateCategoryComponent
  },
  {
    path: 'updateCategory/:id',
    component: UpdateCategoryComponent
  },
  {
    path: 'updateAuthor/:id',
    component: UpdateAuthorComponent
  },
  {
    path: 'authors',
    component: AuthorsComponent
  },
  {
    path: 'createAuthors',
    component: CreateAuthorComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'createBlog',
    component: CreateBlogComponent
  },
  {
    path: 'archived',
    component: ArchivedComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, { initialNavigation: false });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    AuthorsComponent,
    BlogsComponent,
    ArchivedComponent,
    RegisterComponent,
    CreateCategoryComponent,
    CreateBlogComponent,
    CreateAuthorComponent,
    UpdateCategoryComponent,
    UpdateAuthorComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriesService,
    AuthorsService,
    BlogsService,
    ArchivedService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
