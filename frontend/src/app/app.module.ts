import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LugaresComponent } from './lugares/lugares.component';
import { LugarService } from './lugar.service';

@NgModule({
  declarations: [
    AppComponent,
    LugaresComponent
    // outros componentes aqui
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // outros módulos aqui
  ],
  providers: [LugarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
