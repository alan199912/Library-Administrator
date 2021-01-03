import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

// * angular material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// * flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// * Forms
import { ReactiveFormsModule } from '@angular/forms';

// * Service
import { SecurityService } from 'src/app/service/security.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [SecurityService],
})
export class RegisterModule {}
