# -*- coding: utf-8 -*-

import os

import sendgrid
from sendgrid.helpers.mail import *

from django.http import JsonResponse
from django.template.loader import render_to_string

def response_error(code, reason):
    response = JsonResponse({
        "status": code,
        "message": reason
    })
    response.status_code = 400
    return response

parameter_error = response_error(40, "invalid or insufficient parameters")
duplicate_error = response_error(41, "duplicate values in database")
email_error = response_error(42, "unable to send email via sendgrid")
registration_error = response_error(43, "unable to create account")
login_error = response_error(44, "login failed")
not_found_error = response_error(45, "not found")
server_error = response_error(46, "server error")

def send_sendgrid_email(from_email, to_email, subject, content, is_html):
    sg = sendgrid.SendGridAPIClient(apikey=os.environ["SENDGRID_API_KEY"])
    from_email = Email(from_email)
    to_email = Email(to_email)
    content = Content("text/html" if is_html else "text/plain", content)
    mail = Mail(from_email, subject, to_email, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    return not 400 < response.status_code < 600

SENDER = ""

def send_registration_confirmation_email(confirm_link, to_email):
    context = { "confirm_link": confirm_link }
    filename = "registration_confirmation.html"
    subject = "Confirm Your Email for DPS"
    content = render_to_string(filename, context)
    return send_sendgrid_email(SENDER, to_email, subject, content, True)

def send_reset_password_email(reset_link, to_email):
    context = { "reset_link": reset_link }
    filename = "reset_password.html"
    subject = "Reset Your DPS Password"
    content = render_to_string(filename, context)
    return send_sendgrid_email(SENDER, to_email, subject, content, True)
