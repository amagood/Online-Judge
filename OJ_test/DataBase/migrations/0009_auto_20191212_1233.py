# Generated by Django 2.2.7 on 2019-12-12 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DataBase', '0008_rank_rank_attend'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rank',
            name='Rank_Attend',
        ),
        migrations.AddField(
            model_name='summary',
            name='Summary_Attend',
            field=models.BooleanField(default=False),
        ),
    ]
