# Generated by Django 4.2.7 on 2023-11-14 11:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_employer_nom_employer_prenom'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employer',
            name='nom',
        ),
        migrations.RemoveField(
            model_name='employer',
            name='prenom',
        ),
    ]
