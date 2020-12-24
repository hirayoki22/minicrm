import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomersService } from './services/customers.service'
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersFormComponent } from './components/customers-form/customers-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OptionbarComponent } from './components/optionbar/optionbar.component';
import { SortmenuComponent } from './components/optionbar/child-components/sortmenu/sortmenu.component';
import { ContactCounterComponent } from './components/optionbar/child-components/contact-counter/contact-counter.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewmenuComponent } from './components/optionbar/child-components/viewmenu/viewmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomersFormComponent,
    NavbarComponent,
    OptionbarComponent,
    SortmenuComponent,
    ContactCounterComponent,
    FooterComponent,
    ViewmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
