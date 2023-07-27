import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {BacknedErrorMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {authActions} from '../../store/actions'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    BacknedErrorMessages,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
  }
}
