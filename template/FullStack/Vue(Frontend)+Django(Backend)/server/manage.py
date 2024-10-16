#!/usr/bin/env python
import os
import sys
from dotenv import load_dotenv

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    load_dotenv()

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    port = os.getenv('PORT', '3000')

    if 'runserver' in sys.argv:
        sys.argv = [arg for arg in sys.argv if not arg.startswith('0.0.0.0:') and not arg.isdigit()]
        sys.argv.append(f'0.0.0.0:{port}')

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()