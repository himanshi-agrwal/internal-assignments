#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest.app.user.serializers import UserRegistrationSerializer
from rest.app.profile.models import UserProfile
from uuid import UUID
from django.http.response import JsonResponse
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('id', 'first_name', 'last_name', 'phone_number', 'age', 'gender')


class UserProfileView(RetrieveUpdateAPIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            user_profile, _ = list(UserProfile.objects.get_or_create(user=request.user))
            status_code = status.HTTP_200_OK
            response = {
                'message': 'User profile fetched successfully',  
                'data': {
                    'id': user_profile.id,
                    'first_name': user_profile.first_name,
                    'last_name': user_profile.last_name,
                    'phone_number': user_profile.phone_number,
                    'age': user_profile.age,
                    'gender': user_profile.gender,
                    'email': user_profile.user.email,
                    }
                }
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)

    def put(self,request, *args, **kwargs):
        uuid = (kwargs.get('uuid'))
        profile_data = request.data.get('profile')
        uuid = str(uuid).replace("-","")
        try: 
            user_profile = UserProfile.objects.get(pk=uuid) 
        except UserProfile.DoesNotExist: 
            return JsonResponse({'message': 'The profile does not exist'}, status=status.HTTP_404_NOT_FOUND) 
        profile_serialiser = ProfileSerializer(user_profile, data=profile_data) 
        if profile_serialiser.is_valid(): 
            profile_serialiser.save() 
            return JsonResponse(profile_serialiser.data) 
        return JsonResponse(profile_serialiser.errors, status=status.HTTP_400_BAD_REQUEST) 
