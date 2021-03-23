#!/usr/bin/env python3
# -*- coding: utf-8 -*-


from django.conf.urls import url
from rest.app.profile.views import UserProfileView
from django.urls import path


urlpatterns = [
    path('profile/<uuid:uuid>/', UserProfileView.as_view()),
    path('profile', UserProfileView.as_view()),
    ]
