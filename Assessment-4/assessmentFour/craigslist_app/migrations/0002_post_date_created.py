# Generated by Django 4.0.6 on 2022-07-25 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('craigslist_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
