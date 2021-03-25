import logging
import boto3
from botocore.exceptions import ClientError
from django.conf import settings
from botocore.config import Config
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.generics import RetrieveUpdateAPIView
import json
from hashlib import md5
from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
class UploadtoS3:
    
    permission_classes = (IsAuthenticated,)
    
    @csrf_exempt
    def get_url( request, expiration=3600):
        """Generate a presigned URL to share an S3 object

        :param bucket_name: string
        :param object_name: string
        :param expiration: Time in seconds for the presigned URL to remain valid
        :return: Presigned URL as string. If error, returns None.
        """
        req_body = json.loads(request.body)

        object_name = req_body.get('object')

        s3_client = boto3.client("s3",
        endpoint_url= settings.AWS_S3_ENDPOINT_URL)
        try:
            response = s3_client.generate_presigned_post(settings.BUCKET_NAME,
                                              object_name,
                                              Fields={
                                                'acl': 'public-read',
                                                'Content-MD5': str(md5),
                                                'Content-Type': 'binary/octet-stream'
                                                },
                                              Conditions=[
                                                  {"acl": "public-read"},
                                                  ["starts-with", "$Content-Type", ""],
                                                  ["starts-with", "$Content-MD5", ""]
                                              ],
                                              ExpiresIn=expiration)
            # response = s3_client.generate_presigned_url(settings.BUCKET_NAME,
            #                                             object_name,Fields=fields,
            #                                             Conditions=conditions,
            #                                             ExpiresIn=expiration)

        except ClientError as e:
            logging.error(e)
            return None
        # return {"url": response, "fields": json.dumps(response["fields"])}
        # The response contains the presigned URL
        return JsonResponse(response, status=200)
        # return HttpResponse({"url": response, "fields": response.json()}, status=200)