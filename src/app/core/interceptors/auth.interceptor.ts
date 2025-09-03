import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Only add headers to requests going to our API
  if (req.url.startsWith(environment.apiBaseUrl)) {
    const authReq = req.clone({
      setHeaders: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'origin': 'https://apps.hereandnowai.com',
        'referer': 'https://apps.hereandnowai.com/',
        [environment.apiKeyHeaderName]: environment.apiKeyValue
      }
    });
    return next(authReq);
  }
  
  return next(req);
};
