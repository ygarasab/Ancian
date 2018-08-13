from random import random

class Bot:
    def __init__(self, m):
        print(m)
        self.m = m

    def play(self, campo, jogo):
        if campo != None:
            c = jogo.g.velhas[int(campo)]
        else:
            x = random()
            w = int(x//0.1)
            if w<9:
                c = jogo.g.velhas[w]
                campo = str(w)
            
        
        while c.feito:
            x = random()
            w = int(x//0.1)
            if w<9:
                c = jogo.g.velhas[w]
                campo = str(w)
        
        while True:
            x = random()
            y = int(x//0.1)
            if y<9:
                if c.bts[y].text == '': break

        
        jogo.g.velhas[int(campo)].bts[y].text = self.m
        jogo.u = str(y)
        

        jogo.play(campo,y,self.m)
