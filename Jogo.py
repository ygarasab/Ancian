from kivy.app import App
from kivy.graphics import Color, Rectangle
from kivy.uix.anchorlayout import AnchorLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout

class combo:

    def __init__(self):
        combosx = [0,0,0,0,0,0,0,0]
        comboso = [0,0,0,0,0,0,0,0]
        self.combos = [combosx,comboso]
        self.marcas = [[0,3,6],[1,3],[2,3,7],
                       [0,4],[1,4,6,7],[2,4],
                       [0,5,7],[1,5],[2,5,6]]

    def add(self,m):
        m = int(m)
        for i in self.marcas[m]:
            self.combos[jogo.vez][i] += 1
            if self.combos[jogo.vez][i] == 3: return True
        return False
            
        

class raiz(AnchorLayout):

    def __init__(self, **kwargs):
        super(raiz,self).__init__(**kwargs)

        self.anchor = ['center','center']

        with self.canvas.before:
            Color(0,0,0,1)
            self.rect = Rectangle(size = self.size, pos=self.pos)

        self.bind(size=self.update, pos=self.update)

    def update(self, instance, x):
        self.rect.pos = instance.pos
        self.rect.size = instance.size


class gradeMenor(GridLayout):

    def __init__(self, **kwargs):

        super(gradeMenor,self).__init__(**kwargs)

        self.combos = combo()

        self.feito = False

        self.rows = 3
        self.spacing = 2
        self.padding = [2,2,2,2]

        self.bts = []

        for i in range(9):
            b = Button(id=str(i), on_release=self.press, font_size=30, bold=True)
            self.add_widget(b)
            self.bts += [b]

    def press(self,bt):
        ult = jogo.u
        if not jogo.start:
            aMarcar = jogo.g.velhas[int(ult)]
            feito = aMarcar.feito
        else: feito = False

        if jogo.pintado != None:
            for i in range(9):
                jogo.pintado.bts[i].background_color = [1,1,1,1]
            jogo.pintado = None

        if self.feito:
            self.bts[8].background_color = [1,0,0,1]
            jogo.pintado = self
            
        if bt.text == '':
            if (self.id != ult and not feito)and not jogo.start:
                if self.id != ult:
                    for i in range(9):
                        aMarcar.bts[i].background_color = [0,1,0,1]
                        jogo.pintado = aMarcar
                    
            else:
                jogo.start = False
                
                bt.text = jogo.marcas[jogo.vez]
                
                jogo.u = bt.id

                m = int(bt.id)

                self.feito = self.combos.add(m)
                txt = bt.text
                if self.feito:
                    self.isolar(txt)

                    jogo.feito = jogo.combos.add(self.id)
                    if jogo.feito:
                        jogo.isolar(txt,jogo.vez)

                    
                jogo.vez += jogo.marcas[jogo.vez+2]

    def isolar(self,txt):
        for i in range(8):
            self.remove_widget(self.bts[i])
        self.bts[8].text=txt
        self.bts[8].font_size=60
        self.rows = 1
        
                        
                            
        
class gradeMaior(GridLayout):

    def __init__(self, **kwargs):

        super(gradeMaior,self).__init__(**kwargs)


        self.size_hint = [None, None]
        self.rows = 3
        self.spacing = [10,10]

        self.velhas = []

        for i in range(9):
            velha = gradeMenor(id=str(i))
            self.add_widget(velha)
            self.velhas += [velha]


class main(App):

    def build(self):

        self.janela = BoxLayout(orientation='horizontal')

        self.lbls0 = BoxLayout(orientation='vertical',size_hint=[.3,1])
        self.lbls1 = BoxLayout(orientation='vertical',size_hint=[.3,1])
        
        lbl0 = Label(text='x',font_size=70)
        lbl1 = Label(text='o',font_size=70)

        self.lbl0 = Label(text='0',font_size=70)
        self.lbl1 = Label(text='0',font_size=70)

        self.lbls = [self.lbl0,self.lbl1]

        self.lbls0.add_widget(lbl0)
        self.lbls0.add_widget(self.lbl0)

        self.lbls1.add_widget(lbl1)
        self.lbls1.add_widget(self.lbl1)
        
        self.set(None)

        
        return self.janela

    def set(self, x):
        self.pintado = None
        self.start = True
        self.u = None
        self.marcas = ['x','o',1,-1]
        self.vez = 0

        self.combos = combo()

        self.feito = False

        self.r = raiz()
        self.g = gradeMaior()

        self.r.bind(size = self.update, pos = self.update)

        self.r.add_widget(self.g)

        if x!=None:
            self.janela.remove_widget(self.lbls0)
            self.janela.remove_widget(self.fim)
            self.janela.remove_widget(self.lbls1)


        self.janela.add_widget(self.lbls0)
        self.janela.add_widget(self.r)
        self.janela.add_widget(self.lbls1)

    def update(self, instance, x):
        a = instance.size[0]
        b = instance.size[1]
        if a>b:
            a = b
        
        self.g.pos = instance.pos
        self.g.size = [a,a]

    def isolar(self,txt,w):
        self.janela.remove_widget(self.r)
        self.janela.remove_widget(self.lbls1)

        self.fim = BoxLayout(orientation='vertical')
        
        lbl = Label(text='\\\\ '+txt+' //', font_size=100)
        anc = AnchorLayout(anchor_x = 'center', anchor_y='top')
        bt = Button(text='Novo Jogo', size_hint=[.5,.3], on_release=self.set)
        anc.add_widget(bt)

        self.fim.add_widget(lbl)
        self.fim.add_widget(anc)
        
        self.janela.add_widget(self.fim)
        self.janela.add_widget(self.lbls1)

        self.lbls[w].text = str(int(self.lbls[w].text)+1)

jogo = main()
jogo.run()
