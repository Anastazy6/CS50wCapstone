# Generated by Django 4.1 on 2022-12-15 19:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Gwybodaeth', '0002_study_set'),
    ]

    operations = [
        migrations.AddField(
            model_name='study_set',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
