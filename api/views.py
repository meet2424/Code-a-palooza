from rest_framework.decorators import api_view
from rest_framework.response import Response

#import cv2
#import numpy as np
from django.http import JsonResponse
from django.contrib.auth import authenticate

from .serializers import RegisterSerializer, LoginSerializer
from .models import User

from django.core.mail import EmailMessage, get_connection
from django.conf import settings

'''@api_view(['POST'])
def fingerprint_login(request):
    # if request.method == 'GET':
    #     return render(template_name='index.html', request=request)
    fingerprint_image = cv2.imdecode(np.fromstring(request.FILES['fingerprint_image'].read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    print(fingerprint_image)
    _, fingerprint_image = cv2.threshold(fingerprint_image, 100, 255, cv2.THRESH_BINARY)
    fingerprint_image = cv2.erode(fingerprint_image, np.ones((3,3), np.uint8), iterations=1)
    fingerprint_image = cv2.dilate(fingerprint_image, np.ones((3,3), np.uint8), iterations=1)
    reference_template = cv2.imread('101_1.tif', cv2.IMREAD_GRAYSCALE)
    match_score = cv2.matchTemplate(fingerprint_image, reference_template, cv2.TM_CCOEFF_NORMED)
    if match_score > 0.8:
        response = {'success': True, 'message': 'Fingerprint matched'}
    else:
        response = {'success': False, 'message': 'Fingerprint not matched'}
    return JsonResponse(response)'''

def send_email(data):
    email = EmailMessage(subject=data['email_subject'], body=data['email_body'],to=[data['to_email']],from_email=settings.EMAIL_HOST_USER)
    email.send()

@api_view(['POST'])
def signup(request):
    serializer = RegisterSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(is_active = True)
        response = {'success': True, 'message': 'User created successully.'}
    else:
        response = {'success': True, 'message': serializer.errors}
    return JsonResponse(response)

@api_view(['POST'])
def login(request):
    email = request.data.get('email',None)
    password = request.data.get('password',None)
    user = authenticate(email = email, password = password)
    if user :
        serializer = LoginSerializer(user)
        return Response({"status" : True, "message" : 'Login Success'})
    return Response({"status" : False , "message" : 'Invalid Credentials'})

@api_view(['POST'])
def success(request):
    email = []
    data ={'email_body': f"Congratulations! your account is activated.", 'email_subject': "Account activated!",'to_email':email}
    send_email(data)
    return Response({"status" : True, "message" : 'Mail sent!'})