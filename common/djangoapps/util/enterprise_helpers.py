"""
Utility library for working with the edx-enterprise app
"""

from django.conf import settings


def get_enterprise_branding_info(provider_id):
    """
    Client API operation adapter/wrapper
    """
    if not enterprise_enabled():
        return None
    from enterprise import api as enterprise_api
    return enterprise_api.get_enterprise_branding_info(provider_id=provider_id)


def enterprise_enabled():
    """
    Returns boolean indication if enterprise app is enabled on not.
    """
    return settings.FEATURES.get('ENTERPRISE_APP', False)
