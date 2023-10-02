from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings


def send_email(destination: str) -> None:
    """
    Send Code to Email
    Args:
        destination: str
    """
    try:
        domain_name = 'http://127.0.0.1:8000'
        service_email = 'ernalloce1988@yahoo.com'

        html_message = render_to_string(f'{settings.BASE_DIR}/templates/message_email/message_template.html',
                                        {'domain': domain_name, 'path': domain_name, 'email': destination})

        message = EmailMessage('Password recovery', html_message, service_email, [destination])
        message.content_subtype = 'html'
        message.send()
    except Exception as exc:
        print('Exception Send Message: ', exc)
