import os
from tornado.web import HTTPError
from exception import AdminAuthorizationException, UserAuthorizationException
from .jwt_encoder import decode_token


def admin_required(handler):

    def wrapped_handler(handler_object):
        header = handler_object.request.headers
        authorization = header.get('Authorization', '')
        if authorization != os.getenv('SECRET_HEADER'):
            raise AdminAuthorizationException
        return handler(handler_object)

    return wrapped_handler


def json_header(handler):

    def wrapped_handler(response):
        response.set_header('Content-Type', 'application/json')
        response.set_header('Access-Control-Allow-Origin', '*')
        return handler(response)

    return wrapped_handler


def authenticated(handler):

    def wrapped_handler(handler_object):
        header = handler_object.request.headers
        authorization = header.get('Authorization', '')
        try:
            decoded = decode_token(authorization)
            return handler(handler_object, user=decoded['address'])
        except Exception as err:
            raise UserAuthorizationException('Authorization token is invalid')

    return wrapped_handler


def deprecated(handler):

    def wrapped_handler(handler_object):
        raise HTTPError(status_code=404, reason="Invalid api endpoint.")

    return wrapped_handler
