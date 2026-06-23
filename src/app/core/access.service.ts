import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  router = inject(Router);

  private readonly guestToken = 'N7vQ2xLp8MzK4RwHc9';
  private readonly ownerToken = 'Xp84LmQvR2Nz7KtHy5';
  private readonly guestAccessTime = 12 * 60 * 60 * 1000;

  private timeout: any;

  getTokenFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('access');
  }

  checkAccess() {
    const token = this.getTokenFromUrl();

    if (token === this.guestToken) {
      localStorage.setItem('accessType', 'guest');
      localStorage.setItem('accessTime', Date.now().toString());
      this.router.navigate(['/home'], { replaceUrl: true });
      this.startGuestAccessTime();
      return;
    }
    if (token === this.ownerToken) {
      localStorage.setItem('accessType', 'owner');
      localStorage.removeItem('accessTime');
      this.router.navigate(['/home'], { replaceUrl: true });
      return;
    }
    const activeAccess = localStorage.getItem('accessType');

    if (activeAccess === 'guest') {
      const qrScanTime = Number(localStorage.getItem('accessTime'));
      if (Date.now() - qrScanTime < this.guestAccessTime) {
        this.startGuestAccessTime();
        return;
      }
      localStorage.clear();
      this.router.navigate(['/access']);
      return;
    }
    if (activeAccess === 'owner') {
      return;
    }
    this.router.navigate(['/access']);
  }

  startGuestAccessTime() {
    const timeLeft =
      this.guestAccessTime -
      (Date.now() - Number(localStorage.getItem('accessTime')));
    if (timeLeft <= 0) {
      localStorage.clear();
      this.router.navigate(['/access']);
      return;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/access']);
    }, timeLeft);
  }
}
