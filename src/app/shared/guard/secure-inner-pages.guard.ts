import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';

@Injectable( {
	providedIn: 'root'
} )

export class SecureInnerPagesGuard implements CanActivate {

	constructor( public auth: AuthService, public router: Router ) {

	} // constructor()

	canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

		if ( this.auth.isLoggedIn ) {
			console.warn( 'You are not allowed to access this URL!' );
			this.router.navigate( ['dashboard'] )
		}

		return true;

	} // canActivate()

} // SecureInnerPagesGuard
