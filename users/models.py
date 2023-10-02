from django.db import models

from utils.choices import COUNTRIES


class User(models.Model):
    first_name = models.CharField(max_length=100, verbose_name='First Name')
    last_name = models.CharField(max_length=100, verbose_name='Last Name')
    email = models.EmailField(verbose_name='E-Mail')
    phone = models.CharField(max_length=30, verbose_name='Phone number')
    password = models.CharField(max_length=50, verbose_name='Password')
    card = models.ForeignKey(
        'Card',
        on_delete=models.SET_NULL,
        verbose_name='Card',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.first_name


class Card(models.Model):
    country = models.CharField(choices=COUNTRIES, max_length=2, verbose_name='Country')
    address = models.TextField(verbose_name='Address')
    full_name = models.CharField(max_length=150, verbose_name='Full Name')
    amount_payable = models.DecimalField(max_digits=6, decimal_places=2)
    card_num = models.CharField(max_length=16, verbose_name='Card Number')
    card_holder_name = models.CharField(max_length=50, verbose_name='Card Holder Name')
    card_expired = models.CharField(max_length=50, verbose_name='Card Expired')
    card_cvc = models.CharField(max_length=50, verbose_name='Card CVV')

    class Meta:
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'

    def __str__(self):
        return self.card_num
