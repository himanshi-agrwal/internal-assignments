#!/usr/bin/env python3
# -*- coding: utf-8 -*-


from django.conf.urls import url
from rest.app.profile.views import UserProfileView
from django.urls import path
from rest.app.profile.uploadtos3 import UploadtoS3


urlpatterns = [
    path('profile/<uuid:uuid>/', UserProfileView.as_view()),
    path('profile', UserProfileView.as_view()),
    # path('upload-image/<str:key>/', UploadtoS3.get_url),
    path('upload-image', UploadtoS3.get_url),
    ]
