from django.urls import path

from .views import *

urlpatterns = [
    path('', list_domains, name='international'),
    path('en/', main_page, name='main_page'),
    path('order/', order_page, name='order_online'),
    path('order/step2/', order_filling, name='order_filling'),
    path('menu/', menu_page, name='menu'),
    path('specPizza/', spec_pizza_page, name='spec_pizza_page'),
    path('sides/', sides_page, name='sides_page'),
    path('drinks/', drinks_page, name='drinks_page'),
    path('desserts/', desserts_page, name='desserts_page'),
    path('coupons/', coupons_page, name='coupons'),
    path('locations/', locations_page, name='locations'),
    path('tracker/', tracker_page, name='tracker'),
    path('contact_us/', contact_page, name='contact'),
    path('success_register/', success_reg_page, name='success_register'),
    path('payment/step1/', payment_step1_page, name='payment_step1'),
    path('payment/step2/', payment_step2_page, name='payment_step2'),
    path('payment/step3/', payment_step3_page, name='payment_step3'),
    path('payment/step4/', payment_step4_page, name='payment_step4'),
    path('payment/success/', payment_success_page, name='payment_success'),
    path('signup/', signup_page, name='signup_page'),
    path('reset/', reset_pass_page, name='reset_page'),
]
