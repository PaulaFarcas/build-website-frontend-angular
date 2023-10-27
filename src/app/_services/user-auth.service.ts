import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const rolesJson = localStorage.getItem('roles');
    if (rolesJson) {
      return JSON.parse(rolesJson);
    } else {
      return [];  
    }
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    return token !== null ? token : null;
}


  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin(){
    const roles:any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  public isUser(){
    const roles:any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }
  
}
