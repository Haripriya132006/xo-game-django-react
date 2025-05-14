from django.db import models

# Create your models here.
class Game(models.Model):
    board=models.CharField(max_length=9,default=" "*9)
    current_turn=models.CharField(max_length=1,default="X")
    winner=models.CharField(max_length=1,null=True,blank=True)

def __str__(self):
    return f"{self.board} ({self.current_turn})"