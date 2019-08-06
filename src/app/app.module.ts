// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// Routes
import { AppRoutingModule } from './shared/routing/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Services
import { AuthService } from './shared/services/auth.service';

// Environment Variables
import { environment } from '../environments/environment';

@NgModule( {
	declarations: [
		AppComponent,
		SignInComponent,
		SignUpComponent,
		DashboardComponent,
		ForgotPasswordComponent,
		VerifyEmailComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp( environment.firebase ),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireFunctionsModule,
		AppRoutingModule
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
} )

export class AppModule { }
