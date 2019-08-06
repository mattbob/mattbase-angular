import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component( {
	selector    : 'app-sign-up',
	templateUrl : './sign-up.component.html',
	styleUrls   : ['./sign-up.component.scss']
} )

export class SignUpComponent implements OnInit {

	SignUpForm;

	constructor( public auth: AuthService, private formBuilder: FormBuilder ) {

		this.SignUpForm = this.formBuilder.group( {
			email    : [ '', [ Validators.required, Validators.minLength(4), Validators.email ] ],
			password : [ '', [ Validators.required, Validators.minLength(4) ] ]
		} );

	} // constructor()

	ngOnInit() {

	}

} // SignUpComponent
