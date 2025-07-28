document.addEventListener('DOMContentLoaded', () => {
    let signin_form = document.querySelector('#signin-form')
    let signin_btn = document.querySelector('#signin-btn')
    let google_signin_btn = document.querySelector('#google-signin-btn')

    // Google sign-in button functionality
    google_signin_btn.addEventListener('click', () => {
        // You can add your Google OAuth logic here
        console.log('Google sign-in clicked')
        alert('Google sign-in functionality would be implemented here')
        
        // Example: Redirect to Google OAuth
        // window.location.href = 'your-google-oauth-url'
    })

    // Password toggle functionality
    let passwordToggle = document.querySelector('.password-toggle')
    let passwordInput = document.querySelector('#signin-password')

    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type')
        const icon = passwordToggle.querySelector('i')
        
        if (type === 'password') {
            passwordInput.setAttribute('type', 'text')
            icon.classList.remove('bx-show')
            icon.classList.add('bx-hide')
        } else {
            passwordInput.setAttribute('type', 'password')
            icon.classList.remove('bx-hide')
            icon.classList.add('bx-show')
        }
    })

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return re.test(String(email).toLowerCase())
    }

    checkSigninInput = (input) => {
        let err_span = signin_form.querySelector(`span[data-err-for="${input.id}"]`)
        let val = input.value.trim()
        let form_group = input.parentElement

        switch(input.getAttribute('type')) {
            case 'password':
                if (val.length < 6) {
                    form_group.classList.add('err')
                    form_group.classList.remove('success')
                    err_span.innerHTML = 'Password must be at least 6 characters'
                } else {
                    form_group.classList.add('success')
                    form_group.classList.remove('err')
                    err_span.innerHTML = ''
                }
                break;
            case 'email':
                if (val.length === 0 || !validateEmail(val)) {
                    form_group.classList.add('err')
                    form_group.classList.remove('success')
                    err_span.innerHTML = 'Email is invalid'
                } else {
                    form_group.classList.add('success')
                    form_group.classList.remove('err')
                    err_span.innerHTML = ''
                }
        }
    }

    checkSigninForm = () => {
        let inputs = signin_form.querySelectorAll('.form-input')
        inputs.forEach(input => checkSigninInput(input))
    }

    signin_btn.onclick = () => {
        checkSigninForm()
    }

    let inputs = signin_form.querySelectorAll('.form-input')
    inputs.forEach(input => {
        input.addEventListener('focusout', () => {
            checkSigninInput(input)
        })
    })
})