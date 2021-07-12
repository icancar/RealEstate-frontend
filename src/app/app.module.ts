import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeAgentComponent } from './welcome-agent/welcome-agent.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatCardModule} from '@angular/material/card'
import {MatRadioModule} from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component'
import { NgImageSliderModule } from 'ng-image-slider';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { EstateRequestsComponent } from './estate-requests/estate-requests.component';
import { InsertEstateComponent } from './insert-estate/insert-estate.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserInfoComponent } from './user-info/user-info.component';
import { MyEstatesComponent } from './my-estates/my-estates.component';
import { InsertUserComponent } from './insert-user/insert-user.component'
import { ChartsModule } from 'ng2-charts';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { AllEstatesComponent } from './all-estates/all-estates.component';
import { AllUsersComponent } from './all-users/all-users.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { EditEstateInfoComponent } from './edit-estate-info/edit-estate-info.component'
 

const customNotifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'middle',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
	theme: 'material',
	behaviour: {
		autoHide: 1000,
		onClick: false,
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 4
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease'
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50
		},
		shift: {
			speed: 300,
			easing: 'ease'
		},
		overlap: 150
	}
};


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    RegisterComponent,
    WelcomeUserComponent,
    WelcomeAdminComponent,
    WelcomeAgentComponent,
    ChangePasswordComponent,
    RegistrationRequestsComponent,
    EstateInfoComponent,
    EstateRequestsComponent,
    InsertEstateComponent,
    UserInfoComponent,
    MyEstatesComponent,
    InsertUserComponent,
    ChartDataComponent,
    AllEstatesComponent,
    AllUsersComponent,
    EditEstateInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    BrowserAnimationsModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatSidenavModule,
	MatCardModule,
	MatRadioModule,
	MatFormFieldModule,
	MatInputModule,
	MatSliderModule,
	NgImageSliderModule,
	MatSelectModule,
	MatCheckboxModule,
	ChartsModule,
	MatDatepickerModule,
	MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
