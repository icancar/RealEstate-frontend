import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEstatesComponent } from './all-estates/all-estates.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { EditEstateInfoComponent } from './edit-estate-info/edit-estate-info.component';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { EstateRequestsComponent } from './estate-requests/estate-requests.component';
import { HomeComponent } from './home/home.component';
import { InsertEstateComponent } from './insert-estate/insert-estate.component';
import { InsertUserComponent } from './insert-user/insert-user.component';
import { MyEstatesComponent } from './my-estates/my-estates.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersComponent } from './users/users.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeAgentComponent } from './welcome-agent/welcome-agent.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';

const routes: Routes = [
  {path: "login", component:UsersComponent},
  {path:"", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"welcomeAdmin", component:WelcomeAdminComponent},
  {path:"welcomeAgent", component:WelcomeAgentComponent},
  {path:"welcomeUser", component:WelcomeUserComponent},
  {path:"passwordChange", component:ChangePasswordComponent},
  {path:"registrationRequests", component:RegistrationRequestsComponent},
  {path:"estateInfo/:id", component:EstateInfoComponent},
  {path:"estateRequests", component:EstateRequestsComponent},
  {path: "insertEstate", component:InsertEstateComponent},
  {path:"editProfile", component:UserInfoComponent},
  {path: "myEstates", component:MyEstatesComponent},
  {path: "insertUser", component:InsertUserComponent},
  {path: "chartData", component:ChartDataComponent},
  {path: "allEstates", component:AllEstatesComponent},
  {path: "allUsers", component:AllUsersComponent},
  {path: "editProfile/:username", component:UserInfoComponent},
  {path: "editEstateInfo/:id", component:EditEstateInfoComponent},
  {path: "updateFee", component:UpdateFeeComponent},
  {path: "allTransactions", component:AllTransactionsComponent},
  {path: "allOffers", component:AllOffersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
