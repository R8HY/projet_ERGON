# Generated by Django 4.2.7 on 2023-12-11 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0032_cassearticlepanier_cassedecorationpanier_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acteurClass', models.CharField(max_length=255)),
                ('acteurID', models.PositiveIntegerField()),
                ('cibleClass', models.CharField(blank=True, max_length=255)),
                ('cibleID', models.PositiveIntegerField(null=True)),
                ('action', models.CharField(max_length=255)),
                ('description', models.TextField(default='')),
                ('date', models.DateTimeField(null=True)),
                ('lue', models.BooleanField(default=False)),
            ],
        ),
    ]
