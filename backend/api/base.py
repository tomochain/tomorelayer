from settings import settings
from tornado.web import ErrorHandler
from tornado.web import RequestHandler
from peewee import IntegrityError
from logger import logger
from exception import *
import json
import traceback


class BaseHandler(RequestHandler):

    def set_default_headers(self):
        self.set_header('Content-Type', 'application/json')
        self.set_header('Access-Control-Allow-Origin', '*')

    def prepare(self):
        content_type = self.request.headers.get("Content-Type", "")
        jsontype, textplain = "application/json", "text/plain"
        valid_content_type = jsontype in content_type or textplain in content_type

        if valid_content_type:
            self.request_body = json.loads(self.request.body)
        else:
            self.request_body = None

    def json_response(self, response={}, meta={}):
        standard_resp = {
            'payload': response,
            'meta': meta,
        }
        self.write(standard_resp)

    def write_error(self, status_code, **kwargs):
        _, http_exception, stack_trace = kwargs['exc_info']

        is_integrity_error = isinstance(http_exception, IntegrityError)
        is_custom_error = isinstance(http_exception, CustomException)
        is_uncaught_error = status_code == 500 and not is_integrity_error and not is_custom_error

        error = {
            'code': status_code,
            'message': self._reason,
            'detail': str(http_exception),
        }

        if is_uncaught_error:
            # Something wrong with server's handler
            logger.exception(http_exception)
            traceback.print_tb(stack_trace)
            settings['stg'] == 'development' and breakpoint()

        if is_custom_error:
            error['code'] = http_exception.status_code
            error['message'] = http_exception.message
            error['detail'] = http_exception.detail

        if is_integrity_error:
            # FIXME: handle all peewee error in one-separete handler
            message, detail, _ = str(http_exception).split('\n')
            error['code'] = 400
            error['message'] = message
            error['detail'] = detail.replace('DETAIL:  ', '')

        self.set_status(error['code'])
        self.finish(json.dumps({'error': error}))


class ErrorHandler(ErrorHandler, BaseHandler):
    """
    Default handler to be used in case of 404 error
    """
    pass


class NotFoundHandler(BaseHandler):

    def prepare(self):
        raise HTTPError(
            status_code=404,
            reason="Invalid api endpoint.",
        )
