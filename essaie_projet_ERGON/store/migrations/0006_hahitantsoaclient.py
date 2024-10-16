# Generated by Django 4.2.7 on 2023-11-12 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_delete_hahitantsoaclient_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='HahitantsoaClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('prenom', models.CharField(max_length=255)),
                ('contact', models.PositiveIntegerField(null=True)),
                ('categorie', models.CharField(choices=[('Société', 'Société'), ('Particulier', 'Particulier'), ('Guest', 'Guest')], max_length=50, null=True)),
                ('rdv', models.DateTimeField(blank=True, default=None, null=True)),
            ],
        ),
    ]
