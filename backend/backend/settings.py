"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from pathlib import Path
import secrets
import requests
from django.shortcuts import redirect
from django.urls import reverse
from djongo.operations import DatabaseOperations
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "corsheaders",
    "rest_framework",
    "backend",
    "drf_yasg",
    "social_django"
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.csrf",
                "django.template.context_processors.static",
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "djongo",
        "NAME": "ace-your-day-db",
        "CLIENT": {
            "name": "ace-your-day-db",
            "host": os.environ["DB_HOST"],
            "username": os.environ["DB_USER"],
            "password": os.environ["DB_PASSWORD"],
            "authMechanism": "SCRAM-SHA-1",
        },
    },
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
    'social_core.backends.github.GithubOAuth2',
    'social_core.backends.twitter.TwitterOAuth',
    'social_core.backends.facebook.FacebookOAuth2',
]

SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "APP": {
            "client_id": os.environ["CLIENT_ID"],
            "secret": os.environ["CLIENT_SECRET"],
        },
        "AUTH_PARAMS": {
            "access_type": "offline",
        },
        "FETCH_USERINFO": True,
    },
}

DatabaseOperations.conditional_expression_supported_in_where_clause = (
    lambda *args, **kwargs: False
)


SITE_ID = 1

def get_github_user_info(access_token):
    url = 'https://api.github.com/user'
    headers = {
        'Authorization': f'token {access_token}',
        'Accept': 'application/json'
    }
    response = requests.get(url, headers=headers)
    return response.json()

# Example usage
github_access_token = 'YOUR_ACCESS_TOKEN'
user_info = get_github_user_info(github_access_token)
print(user_info)



state = secrets.token_urlsafe(16)
LOGIN_REDIRECT_URL = "http://localhost:3000/calendar"
def github_login(request):
    # Generate a random state value
    state = secrets.token_urlsafe(16)
    # Store the state value in the session for later verification
    request.session['github_state'] = state

    # Redirect the user to GitHub for authentication
    github_authorize_url = 'https://github.com/login/oauth/authorize'
    params = {
        'client_id': SOCIAL_AUTH_GITHUB_KEY,
        'redirect_uri': request.build_absolute_uri(reverse('github_callback')),
        'state': state,
    }
    print(request.build_absolute_uri(reverse('github_callback')))
    LOGIN_REDIRECT_URL = f"{github_authorize_url}?{'&'.join([f'{key}={value}' for key, value in params.items()])}"
    return redirect(LOGIN_REDIRECT_URL)

def github_callback(request):
    # Verify the state parameter
    state = request.GET.get('state')
    if state != request.session.get('github_state'):
        return HttpResponseBadRequest('Invalid state parameter')
    
    code = request.GET.get('code')
    if not code:
        return HttpResponseBadRequest('Missing authorization code')

    # Make a POST request to GitHub to exchange the code for an access token
    token_url = 'https://github.com/login/oauth/access_token'
    params = {
        'client_id': SOCIAL_AUTH_GITHUB_KEY,
        'client_secret': SOCIAL_AUTH_GITHUB_SECRET,
        'code': code,
        'redirect_uri': request.build_absolute_uri(reverse('github_callback')),
        'state': state,
    }
    headers = {
        'Accept': 'application/json'
    }
    response = requests.post(token_url, params=params, headers=headers)
    if response.status_code != 200:
        return HttpResponseBadRequest('Failed to exchange code for access token')

    # Parse the response to get the access token
    data = response.json()
    access_token = data.get('access_token')
    if not access_token:
        return HttpResponseBadRequest('Missing access token')

    # Use the access token to make API calls to GitHub
    # For example, you can use it to get user information
    # See: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
    user_url = 'https://api.github.com/user'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    user_response = requests.get(user_url, headers=headers)
    if user_response.status_code != 200:
        return HttpResponseBadRequest('Failed to get user information')

    # Process the user information as needed
    user_data = user_response.json()
    # For example, you could save the user data to your database
    # user_data['login'], user_data['name'], etc.

    # Redirect the user to the desired page after successful authentication
    redirect_url = "http://localhost:3000/calendar"
    # query_params = {
    #     'access_token': access_token,
    # }
    # redirect_url_with_params = f'{redirect_url}?{urlencode(query_params)}'
    # return redirect(redirect_url_with_params)
    return redirect(redirect_url)


# LOGIN_REDIRECT_URL = "http://localhost:8000/oauth/complete/github/?code=42c47d60179e3df495d4&state="
LOGOUT_REDIRECT_URL = "http://localhost:3000/"


LOGIN_URL = 'login'
# LOGOUT_URL = 'logout'


SOCIAL_AUTH_GITHUB_KEY = '42c47d60179e3df495d4'
SOCIAL_AUTH_GITHUB_SECRET = '46eb09b5366549b47035b9eb9fdc52f14521a082'