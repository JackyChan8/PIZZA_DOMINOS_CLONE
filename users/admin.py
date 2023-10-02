from django.contrib import admin

from .models import User, Card


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "first_name", "last_name", "email", "phone", "password", "card"
    )
    list_filter = (
        "phone", "card"
    )


admin.site.register(User, UserAdmin)


class CardAdmin(admin.ModelAdmin):
    list_display = (
        "country", "address", "full_name", "amount_payable", "card_num", "card_holder_name", "card_expired", "card_cvc"
    )
    list_filter = ("country", "full_name", "card_num")


admin.site.register(Card, CardAdmin)
