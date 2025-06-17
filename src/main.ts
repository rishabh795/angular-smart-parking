import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {...appConfig, providers: [...appConfig.providers || [], importProvidersFrom(HttpClientModule)] })
.catch((err)=>console.error(err));