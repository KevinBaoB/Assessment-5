# Generated by Django 4.0.6 on 2022-08-02 18:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Surface',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Cleaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('items', models.CharField(max_length=255)),
                ('routine_care', models.TextField(blank=True)),
                ('special_instructions', models.TextField(blank=True)),
                ('surface', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='cleaning_app.surface')),
            ],
        ),
    ]