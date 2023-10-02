from django.http import JsonResponse
from rest_framework import views, permissions

from .models import User
from utils.send_mail import send_email


class RegisterView(views.APIView):
    """Signup user"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        if data:
            user = User.objects.create(**data)
            return JsonResponse(
                {
                    'status': 'success',
                    'data': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'phone': user.phone,
                    }
                },
                status=201
            )
        return JsonResponse(
            {
                'status': 'error',
                'message': 'Registration error'
            },
            status=400
        )


class LoginView(views.APIView):
    """Signin user"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        if data:
            user = User.objects.filter(**data)
            if user:
                user = user[0]
                return JsonResponse(
                    {
                        'status': 'success',
                        'data': {
                            'email': user.email,
                            'first_name': user.first_name,
                            'last_name': user.last_name,
                            'phone': user.last_name,
                        }
                    },
                    status=201
                )
            else:
                return JsonResponse(
                    {
                        'status': 'error',
                        'message': 'Login Error'
                    },
                    status=400
                )
        return JsonResponse(
            {
                'status': 'error',
                'message': 'Login error'
            },
            status=400
        )


class RestorePassView(views.APIView):
    """Restore Password"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        if data:
            user = User.objects.filter(**data)
            if user:
                # Send Email
                send_email(data['email'])
                return JsonResponse(
                    {
                        'status': 'success'
                    },
                    status=201
                )
            else:
                return JsonResponse(
                    {
                        'status': 'error',
                        'message': 'Restore Password Error'
                    },
                    status=400
                )
        return JsonResponse(
            {
                'status': 'error',
                'message': 'Restore Password error'
            },
            status=400
        )


class ChangePassView(views.APIView):
    """Change Password"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        print('data: ', data)
        if data:
            user = User.objects.filter(email=data['email'])
            if user:
                user = user[0]
                user.password = data['password']
                user.save()
                return JsonResponse(
                    {
                        'status': 'success'
                    },
                    status=201
                )
            else:
                return JsonResponse(
                    {
                        'status': 'error',
                        'message': 'Save Password Error'
                    },
                    status=400
                )
        return JsonResponse(
            {
                'status': 'error',
                'message': 'Save Password error'
            },
            status=400
        )
