# Generated by Django 4.2.7 on 2023-11-17 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_delete_employer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produit',
            name='description',
            field=models.TextField(max_length=255, null=True),
        ),
    ]
