from django.apps import AppConfig

# 'api' app configuration 
# use BigAutoField for auto-incrementing IDs
class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'