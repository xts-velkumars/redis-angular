import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
 
import { CacheService } from "./services/cache.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [
    RouterOutlet,
    CardModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private cacheService: CacheService) {

  }

  title = 'demoAngular';
  key : string = "fakeKey";

 async setDataIntoCache()
  {
    await this.cacheService.setCache(this.key, "Hello World");
  }

  async getDataFromCache()
  {
    await this.cacheService.getCache(this.key).then(async result => {
        console.log(result);
         });
  }
}
