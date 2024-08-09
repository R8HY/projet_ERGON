# Generated by Django 4.2.5 on 2023-10-10 06:32

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import store.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('prenom', models.CharField(max_length=255)),
                ('contact', models.PositiveIntegerField(null=True)),
                ('categorie', models.CharField(choices=[('Societe', 'Societe'), ('Particulier', 'Particulier'), ('Guest', 'Guest')], max_length=50, null=True)),
                ('rdv', models.DateTimeField(blank=True, default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Panier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TypeProduit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categorie', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ['categorie'],
            },
        ),
        migrations.CreateModel(
            name='Particulier',
            fields=[
                ('client_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='store.client')),
                ('date_naissance', models.DateField()),
                ('lieu_naissance', models.CharField(max_length=255)),
                ('num_CIN', models.PositiveIntegerField()),
                ('cin_date_delivrance', models.DateField()),
                ('certificat_residence', models.CharField(max_length=255)),
                ('lieu_residence', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
            ],
            bases=('store.client',),
        ),
        migrations.CreateModel(
            name='RendezVous',
            fields=[
                ('client_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='store.client')),
                ('dateRdv', models.DateTimeField()),
            ],
            bases=('store.client',),
        ),
        migrations.CreateModel(
            name='Societe',
            fields=[
                ('client_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='store.client')),
                ('nomSociete', models.CharField(max_length=255)),
                ('domiciliation', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('nif', models.PositiveIntegerField()),
                ('stat', models.PositiveIntegerField()),
            ],
            bases=('store.client',),
        ),
        migrations.CreateModel(
            name='Produit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomProduit', models.CharField(max_length=255)),
                ('prix_unitaire', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(1000000)])),
                ('nombre', models.IntegerField()),
                ('dernier_modification', models.DateTimeField(auto_now=True)),
                ('type_produit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='produit', to='store.typeproduit')),
            ],
            options={
                'ordering': ['nomProduit'],
            },
        ),
        migrations.CreateModel(
            name='Commande',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_commande', models.DateTimeField(auto_now_add=True)),
                ('etat_paiement', models.CharField(choices=[('C', 'Complete'), ('A', 'Avance')], default='C', max_length=1)),
                ('client_guest', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='store.client')),
            ],
        ),
        migrations.CreateModel(
            name='ArticlePanier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.PositiveSmallIntegerField()),
                ('panier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='store.panier')),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.produit')),
            ],
        ),
        migrations.CreateModel(
            name='ArticleCommande',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.PositiveSmallIntegerField()),
                ('prix_unitaire', models.DecimalField(decimal_places=2, max_digits=6)),
                ('commande', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='article', to='store.commande')),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='articleCommande', to='store.produit')),
            ],
        ),
        migrations.CreateModel(
            name='ParticulierImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='store/images', validators=[store.validators.validate_file_size])),
                ('particulier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='store.particulier')),
            ],
        ),
    ]
