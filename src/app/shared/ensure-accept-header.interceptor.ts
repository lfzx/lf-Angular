import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class EnsureAcceptHeaderInterceptor  implements HttpInterceptor {
// 保证accept有值，拦截请求，看header里面有没有accept这个header，如果没有设默认值为application/json
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has('Accept')) {
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        }
        return next.handle(request);
    }
}