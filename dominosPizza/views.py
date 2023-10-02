from django.shortcuts import render


def list_domains(request):
    return render(request, "index.html")


def main_page(request):
    return render(request, "en/index.html")


def order_page(request):
    return render(request, "en/order_online/index.html")


def order_filling(request):
    return render(request, "en/order_online/step_2/step2.html")


def menu_page(request):
    return render(request, "en/menu/seeAll.html")


def coupons_page(request):
    return render(request, "en/coupon/index.html")


def locations_page(request):
    return render(request, "en/order_online/index.html")


def tracker_page(request):
    return render(request, "en/tracker/index.html")


def contact_page(request):
    return render(request, "en/contact_us/index.html")


def spec_pizza_page(request):
    return render(request, "en/menu/specialtyPizza.html")


def sides_page(request):
    return render(request, "en/menu/sides.html")


def drinks_page(request):
    return render(request, "en/menu/drinks.html")


def desserts_page(request):
    return render(request, "en/menu/desserts.html")


def success_reg_page(request):
    return render(request, "en/signup/success_register/index.html")


def payment_step1_page(request):
    return render(request, "en/payment/index.html")


def payment_step2_page(request):
    return render(request, "en/payment/payment/method.html")


def payment_step3_page(request):
    return render(request, "en/payment/payment/card/index.html")


def payment_step4_page(request):
    return render(request, "en/payment/payment/card/3ds/3ds.html")


def payment_success_page(request):
    return render(request, "en/payment/payment/card/3ds/successPay.html")


def signup_page(request):
    return render(request, "en/signup/index.html")


def reset_pass_page(request):
    return render(request, "en/signin/resetPass.html")
