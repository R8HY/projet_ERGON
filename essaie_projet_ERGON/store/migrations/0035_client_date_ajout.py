# Generated by Django 4.2.7 on 2023-12-12 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0034_payementcassepanier_fraissuppcassepanier_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='date_ajout',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
