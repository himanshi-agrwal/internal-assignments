#!/usr/bin/env python3
# -*- coding: utf-8 -*-


import uuid
from django.db import models
from rest.app.user.models import User


class UserProfile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, unique=False, null=True, blank=True)
    last_name = models.CharField(max_length=50, unique=False, null=True, blank=True)
    phone_number = models.CharField(max_length=10, unique=True, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)

    class Meta:
        '''
        to set table name in database
        '''
        db_table = "profile"
