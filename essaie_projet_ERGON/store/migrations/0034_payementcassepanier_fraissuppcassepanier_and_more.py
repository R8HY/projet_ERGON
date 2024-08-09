# Generated by Django 4.2.7 on 2023-12-12 07:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0033_notification'),
    ]

    operations = [
        migrations.CreateModel(
            name='PayementCassePanier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant', models.PositiveIntegerField()),
                ('date', models.DateField()),
                ('panier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='casse_payements', to='store.panier')),
            ],
        ),
        migrations.CreateModel(
            name='FraisSuppCassePanier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant', models.PositiveIntegerField()),
                ('motif', models.TextField()),
                ('panier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='frais_casse_additionnels', to='store.panier')),
            ],
        ),
        migrations.CreateModel(
            name='CasseSallePanier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant', models.PositiveIntegerField()),
                ('motif', models.TextField()),
                ('panier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='casse_salle', to='store.panier')),
                ('salle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.sallepanier')),
            ],
        ),
    ]
