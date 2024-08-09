from django.core.exceptions import ValidationError

def validate_file_size(file):
    max_size = 50
    if file.size > max_size:
        raise ValidationError(f'File more than {max_size} KB')