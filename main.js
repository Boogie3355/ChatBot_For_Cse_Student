import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQsnw_xML1HIC3j-KM1I-pHX5ioZ-cSbU",
  authDomain: "web-warriors-52b21.firebaseapp.com",
  projectId: "web-warriors-52b21",
  storageBucket: "web-warriors-52b21.firebasestorage.app",
  messagingSenderId: "553207778394",
  appId: "1:553207778394:web:6f37ef34d7d624cf1f9c63",
  measurementId: "G-YN7KW4LV7B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const signin_form = document.querySelector('#signin-form');
  const signin_btn = document.querySelector('#signin-btn');
  const google_signin_btn = document.querySelector('#google-signin-btn');
  const forgot_password_link = document.querySelector('#forgot-password-link');

  // Google sign-in button functionality
  google_signin_btn.addEventListener('click', function() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href = "logged.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
        alert("Google sign-in failed: " + errorMessage);
      });
  });

  // Password toggle functionality
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('#signin-password');

  passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type');
    const icon = passwordToggle.querySelector('i');
    
    if (type === 'password') {
      passwordInput.setAttribute('type', 'text');
      icon.classList.remove('bx-show');
      icon.classList.add('bx-hide');
    } else {
      passwordInput.setAttribute('type', 'password');
      icon.classList.remove('bx-hide');
      icon.classList.add('bx-show');
    }
  });

  // Forgot password link functionality
  forgot_password_link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior (page jump)
    const email = document.getElementById('signin-email').value.trim();

    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent! Please check your inbox.');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  });

  // Form validation functions
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checkSigninInput = (input) => {
    let err_span = signin_form.querySelector(`span[data-err-for="${input.id}"]`);
    let val = input.value.trim();
    let form_group = input.parentElement;

    switch(input.getAttribute('type')) {
      case 'password':
        if (val.length < 6) {
          form_group.classList.add('err');
          form_group.classList.remove('success');
          err_span.innerHTML = 'Password must be at least 6 characters';
        } else {
          form_group.classList.add('success');
          form_group.classList.remove('err');
          err_span.innerHTML = '';
        }
        break;
      case 'email':
        if (val.length === 0 || !validateEmail(val)) {
          form_group.classList.add('err');
          form_group.classList.remove('success');
          err_span.innerHTML = 'Email is invalid';
        } else {
          form_group.classList.add('success');
          form_group.classList.remove('err');
          err_span.innerHTML = '';
        }
    }
  };

  const checkSigninForm = () => {
    let inputs = signin_form.querySelectorAll('.form-input');
    inputs.forEach(input => checkSigninInput(input));
  };

  signin_btn.onclick = (e) => {
    e.preventDefault(); // Prevent form submission/reload
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value.trim();

    // Basic validation (optional, you can keep your existing validation too)
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in as:", user.email);
        window.location.href = "chat.html"; // or wherever you want to redirect
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Sign in failed: " + errorMessage);
      });
  };

  let inputs = signin_form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focusout', () => {
      checkSigninInput(input);
    });
  });
});