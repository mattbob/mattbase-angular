import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component( {
	selector    : 'app-sign-in',
	templateUrl : './sign-in.component.html',
	styleUrls   : ['./sign-in.component.scss']
} )

export class SignInComponent implements OnInit {

	SignInForm;

	constructor( public auth: AuthService, private formBuilder: FormBuilder ) {

		this.SignInForm = this.formBuilder.group( {
			email    : [ '', [ Validators.required, Validators.minLength(4), Validators.email ] ],
			password : [ '', [ Validators.required, Validators.minLength(4) ] ]
		} );

	} // constructor()

	ngOnInit() {

	} // ngOnInit()

} // SignInComponent
