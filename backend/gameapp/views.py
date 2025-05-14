from django.shortcuts import render

# just add these three lines

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game 

# Create your views here.

def check_winner(board):
    lines=[
        (0,1,2),(3,4,5),(6,7,8),
        (0,3,6),(1,4,7),(2,5,8),
        (0,4,8),(2,4,6),
    ]

    for i,j,k in lines:
        if board[i] != " " and board[i] ==board[j] ==board[k]:
            return board[i]
    return None

@api_view(['POST'])
def make_move(request):
    game_id = request.data['game_id']
    position= (request.data['position'])

    if isinstance(position,list):
        position=position[0]

    game=Game.objects.get(id=game_id)
    board=list(game.board)

    if isinstance(position, int) and 0 <= position < len(board):
        if board[position] == " " and not game.winner:
            board[position] = game.current_turn
            winner = check_winner(board)
            game.board = "".join(board)
            if winner:
                game.winner = winner
            else:
                game.current_turn = "O" if game.current_turn == "X" else "X"
            game.save()
            return Response({
                "message": "Move accepted",
                "board": game.board,
                "current_turn": game.current_turn,
                "winner": game.winner
            })
        else:
            return Response({"error": "Invalid move"}, status=400)
    else:
        return Response({"error": "Invalid position data"}, status=400)

@api_view(['GET'])
def create_game(request):
    game=Game.objects.create()
    return Response({
        "game_id":game.id,
        "board":game.board,
        "current_turn": game.current_turn
    })