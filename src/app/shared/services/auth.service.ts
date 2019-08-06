import { Injectable, NgZone } from '@angular/core'; // NgZone service to remove outside scope warning
import { User } from '../services/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable( {
	providedIn: 'root'
} )

export class AuthService {

	user: any; // The user's authentication data
	userData: any; // Data from the user collection

	constructor( public Fireauth: AngularFireAuth, public Firestore: AngularFirestore, public router: Router, public ngZone: NgZone ) {

		// Save the user data to localstorage when logged in and remove it when logged out
		this.Fireauth.authState.subscribe( user => {
			if ( user ) {
				this.user = user;
				this.GetUserData( user.uid );
				localStorage.setItem( 'user', JSON.stringify( this.user ) );
			} else {
				localStorage.removeItem( 'user' );
			}
		} )

	} // constructor()

	/**
	 * Sign in with an email and password.
	 */
	SignIn( email: string, password: string ) {

		return this.Fireauth.auth.signInWithEmailAndPassword( email, password )
			.then( ( result ) => {
				// Send the user to the Dashboard
				this.ngZone.run( () => {
					this.router.navigate( ['dashboard'] );
				} );

				this.SetUserData( result.user );
			} ).catch( ( error ) => {
				console.warn( error.message );
			} );

	} // SignIn()

	/**
	 * Sign up with an email and password.
	 */
	SignUp( email: string, password: string ) {

		return this.Fireauth.auth.createUserWithEmailAndPassword( email, password )
			.then( ( result ) => {
				this.SendVerificationMail(); // Have new users verify their email
				this.SetUserData( result.user ); // Set the user data
			} ).catch( ( error ) => {
				console.warn( error.message );
			} );

	} // SignUp()

	/**
	 * Send email verfificaiton when new user signs up.
	 */
	SendVerificationMail() {

		return this.Fireauth.auth.currentUser.sendEmailVerification()
			.then( () => {
				this.router.navigate( ['verify-email'] );
			} );

	} // SendVerificationMail()

	/**
	 * Reset a forgotten password.
	 */
	ForgotPassword( email: string ) {

		return this.Fireauth.auth.sendPasswordResetEmail( email )
			.then( () => {
				window.alert( 'Password reset email sent, check your inbox.' );
			} ).catch( ( error ) => {
				console.warn( error );
			} );

	} // ForgotPassword()

	/**
	 * Returns true when the user is looged in and their email is verified.
	 */
	get isLoggedIn(): boolean {

		this.user = JSON.parse( localStorage.getItem( 'user' ) );
		return ( this.user !== null && this.user.emailVerified !== false ) ? true : false;

	} // isLoggedIn()

	/**
	 * Sign in with Google
	 */
	GoogleAuth() {

		return this.AuthLogin( new auth.GoogleAuthProvider() );

	} // GoogleAuth()

	/**
	 * Auth logic to run with auth providers.
	 */
	AuthLogin( provider ) {

		return this.Fireauth.auth.signInWithPopup( provider )
			.then( ( result ) => {
				// Send the user to the Dashboard
				this.ngZone.run( () => {
					this.router.navigate( ['dashboard'] );
				} );

				// Set the user data
				this.SetUserData( result.user );
			} ).catch( ( error ) => {
				console.warn( error );
			} );

	} // AuthLogin()

	/**
	 * Set up user data when signing in.
	 */
	SetUserData( user: any ) {

		const userRef: AngularFirestoreDocument<any> = this.Firestore.doc( `users/${user.uid}` );

		const userData: User = {
			uid           : user.uid,
			email         : user.email,
			displayName   : user.displayName,
			photoURL      : user.photoURL,
			emailVerified : user.emailVerified
		};

		return userRef.set( userData, {
			merge: true
		} );

	} // SetUserData()

	/**
	 * Gets the user's data from the users collection.
	 */
	GetUserData( user_id ) {

		this.userData = this.Firestore.doc( `users/${user_id}` ).valueChanges();

	} // GetUserData()

	/**
	 * Sign out, remove the user data from localstorage, and redirect them to the Sign In page.
	 */
	SignOut() {

		return this.Fireauth.auth.signOut().then( () => {
			localStorage.removeItem( 'user' );
			this.router.navigate( ['sign-in'] );
		} );

	} // SignOut()

} // AuthService
