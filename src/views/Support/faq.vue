<template>
  <div id="FAQ">
    <div class="faq-content">
      <h2>{{$t('views.Support.faq.faq')}}</h2>
      <div class="faq-item">
        <h4>{{$t('views.Support.faq.h1')}}</h4>
        <a href="#">{{$t('views.Support.faq.a_word')}}</a>
      </div>
      <div class="faq-item" v-for="item in FaqData">
        <h4>{{item.title}}</h4>
        <p v-for="key in item.content">{{key}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "faq",
    data(){
      return {
        FaqData:[
          {
           title: "Come utilizzare la fotocamera subacquea / la modalità video Rugged-Phone?",
             content:[
              "Avvia l'interfaccia principale, scorri verso il basso la barra di stato nella parte superiore del telefono per trovare il menu della fotocamera subacquea e fai clic sulla fotocamera subacquea per accedere alla modalità di ripresa subacquea;",
               "La modalità subacquea disabilita il touch screen e i tre pulsanti nella parte inferiore dello schermo. Tutti i menu di questa interfaccia sono il menu predefinito della modalità della fotocamera. Se è necessario regolare, uscire dalla modalità di ripresa subacquea e regolarla normalmente modalità.",
               "Utilizza il pulsante di aumento del volume per scattare una foto o avviare / interrompere un video;",
               "Fai clic sul pulsante di riduzione del volume per passare da foto a video.",
               "Tieni premuto il pulsante di riduzione del volume per 1-3 secondi e rilascia il pulsante per passare dalla fotocamera anteriore a quella posteriore e viceversa.",
               "Premere il pulsante di alimentazione laterale per spegnere il monitor e uscire dalla fotocamera subacquea."
             ]
          },
          {
           title: "Come utilizzare i pulsanti personalizzati del telefono?",
             content:[
               "Questo pulsante consente di aprire un'applicazione specifica quando si preme brevemente, si preme a lungo o si fa doppio clic sul pulsante 'Programmabile'.",
               "Avvia nel menu di configurazione, scorri verso il basso fino a' Intelligente 'e apri l'opzione;",
               "Fare clic su pressione breve, pressione lunga o doppio clic per accedere all'operazione di scelta rapida delle impostazioni per aprire l'elenco dei menu; (abilita la registrazione, la torcia, la cattura dello schermo, la fotocamera subacquea, ecc.) ",
               "Fare clic su pressione breve, pressione lunga o doppio clic per accedere alle impostazioni per aprire l'applicazione, impostare per aprire qualsiasi applicazione nel telefono;",
               "Nota: è possibile utilizzare una sola opzione alla volta."
             ]
          },
          {
            title: "Che cosa significa Non-incendive: Class 1 Division 2, Grade A-D, T4?",
            content:[
               "1. La zona 2 (o Div 2) è un luogo in cui è improbabile che si formi un'atmosfera esplosiva durante il normale funzionamento ma, se si verifica, persisterà solo per un breve periodo (<10 ore / anno).",
               '2. T4 fa riferimento alla temperatura massima raggiunta dal telefono. Questo telefono è classificato T4, il che significa che la temperatura del telefono non supererà i 135 ° C. ',
               "3. Il gruppo A-D si riferisce ai tipi di gas pericolosi.",
               "4. TAMB si riferisce alle temperature ambiente superiore e inferiore in cui il telefono è approvato per l'uso e rimangono classificate a prova di incendio. Per Blackview Rugged Phone, tale intervallo è compreso tra -10 ° C e + 55 ° C "
             ]
          },
          {
            title: "Qual è la classificazione IP e MIL SPEC per Blackview Rugged Phone?",
             content:[
               "IP sta per 'Ingress Protection'. Blackview Rugged Phone è classificato come IP68. Il '6' in questa classificazione si riferisce alla classificazione della polvere. Questo telefono è classificato come 'a tenuta di polvere', il che significa protezione completa contro l'intrusione di polvere purché tutti i coperchi delle porte siano chiusi correttamente.",
               "L''8 'nella classificazione si riferisce alla capacità del telefono di essere immerso in acqua. Il Blackview Phone può essere immerso fino a 1,5 m di acqua per 30 minuti a condizione che tutte le coperture delle porte siano adeguatamente chiuse.",
               "La classificazione MIL-SPEC per Blackview Rugged Phone è MIL SPEC 810G, rendendo il Blackview Rugged Phone a prova di caduta fino a '6', a prova di polvere (quando tutti i coperchi delle porte sono chiusi correttamente) e a prova di vibrazioni (Categoria 4 - Camion / rimorchio - Protetto Cargo). "
             ]
          },
          {
            title:"Qual è la classificazione delle aree pericolose per il Blackview Phone?",
            content:[
                "A prova di accensione: Classe 1 Divisione 2, Grado A-D, T4.",
               '(Non caricare, collegare o rimuovere alcun oggetto dal telefono mentre ci si trova in aree pericolose.)'            ]
          },
          {
            title: "Dove posso acquistare Blackview Phone?",
            content:[
"Il telefono Blackview può essere acquistato tramite questo sito Web Store, AliExpress Store, Amazon Store, ecc."            ]
          },
          {
title: "Come risolvo quando si riscontra una scarsa qualità del suono?",
            content:[
             "Ci sono una serie di fattori che possono influire sulle prestazioni audio del tuo dispositivo:",
               "La causa più comune della scarsa qualità del suono è l'acqua nel microfono o nell'altoparlante.",
               "Se il ricevitore è stato immerso in acqua, potrebbe essere necessario che il microfono e l'altoparlante si asciughino per riprendere la normale funzionalità.",
               "Tu, o l'altra persona con cui stai parlando, potresti trovarti in un'area con segnale debole. Prova a spostarti in un'altra zona. ",
               "Potresti avere sporco / detriti che coprono il microfono o l'altoparlante. In tal caso, pulisci il dispositivo. "
            ]
          },
          {
title: "Cosa devo fare in caso di problemi di ricezione / segnale?",
            content:[
"Scarsa qualità delle chiamate:",
               'Controllare se il volume del dispositivo è regolato a un livello confortevole accettabile.',
               'Quando il dispositivo viene utilizzato in aree con segnale debole, ad es. vicino a edifici alti o in scantinati, la qualità della chiamata potrebbe risentirne negativamente. ',
               "Quando questo dispositivo viene utilizzato in un periodo ad alta intensità di chiamate, come le ore di punta, la mancanza di chiamata o la scarsa qualità della chiamata possono essere causati dalla congestione della rete.",
               'Nota:',
               "Se ci si trova in un'area con scarsa ricezione / segnale, il tempo di standby potrebbe essere più breve del solito. Questo perché il tuo dispositivo cerca regolarmente un segnale migliore e quindi consuma la batteria. "
               ]
          },
          {
title: 'Cosa devo fare se viene visualizzato" Inserisci codice PUK "?',
            content:[
             "Dopo tre errori consecutivi nell'inserimento del codice PIN corretto della scheda SIM, il codice PIN verrà bloccato e verrà visualizzata la richiesta del codice PUK.",
               "Prima di tentare di inserire il codice PUK, assicurarsi di disporre del codice corretto fornito dal provider di rete.",
               "Dopo dieci tentativi falliti di inserire il codice PUK, la scheda SIM verrà disabilitata in modo permanente.",
               "Una volta che la scheda SIM è disabilitata in modo permanente, sarà necessario contattare l'ente competente per acquistare una nuova scheda SIM."
            ]
          },
          {
title: 'Cosa devo fare se nella schermata Home viene visualizzato" Solo chiamata di emergenza "?',
            content:[
             "Questo verrà visualizzato se ci sono problemi con la scheda SIM o problemi con il tuo account cellulare.",
               "Inoltre, se ti trovi in un'area non coperta dal tuo provider di rete."
            ]
          },
          {
title: 'Cosa devo fare se il dispositivo visualizza il messaggio \" Nessun servizio \ "?',
            content:[
              "Questo può essere visualizzato se ti trovi in un'area non coperta dal tuo provider di rete o se ti trovi in un'area con scarsa ricezione, ad esempio un'area chiusa.",
               "Nessun servizio verrà visualizzato sullo schermo finché la situazione non sarà risolta trasferendosi in un'area di servizio.",
               "Se il problema persiste quando ci si trova in una posizione di servizio valida, contattare il proprio operatore di rete per assicurarsi che non vi siano limitazioni al servizio o ai servizi SIM."
            ]
          },
          {
            title:'Cosa indica il messaggio \ "Inserisci scheda SIM \"?',
            content:[
              "Questo messaggio potrebbe essere visualizzato se il dispositivo non riconosce la scheda SIM.",
               'Assicurati di aver inserito correttamente la scheda SIM.',
               'Pulire il lato metallico della scheda SIM con un panno asciutto.',
               "Se la carta SIM continua a non essere riconosciuta, contatta il tuo operatore di rete per assicurarti che la carta SIM sia stata abilitata o per verificare se sono disponibili ulteriori istruzioni."
            ]
          },
          {
            title:"Come posso eseguire il backup dei dati su un dispositivo di archiviazione esterno?",
            content:[
              "Per trasferire file dal telefono al PC / Mac:",
              'Collega il tuo Blackview Phone al tuo PC / Mac tramite cavo USB.',
               'Nella barra delle notifiche del telefono Blackview, tocca la notifica" Usa USB per "e seleziona" Trasferisci file ".',
               "Il Blackview Phone sarà ora visibile su PC / Mac.",
               "Apri il Blackview Phone tramite PC / Mac per esplorare i file.",
               "Copiare qualsiasi cosa sul PC / Mac di cui si desidera eseguire il backup.",
               "Nota: in alternativa, eseguire il backup su una scheda MicroSD ™ inserendone una nel Blackview Phone. Copia i file su di esso utilizzando l'app di esplorazione file scelta. "
            ]
          },
          {
            title: "Come faccio a cancellare la cache e la cronologia del browser?",
            content:[
                "Avvia l'app Chrome.",
                 "Fare clic sull'icona del menu in alto a destra (tre punti verticali).",
                 'Fai clic su" Impostazioni ".',
                 'Fare clic su" Privacy ".',
                 'Scorri verso il basso e tocca" Cancella dati di navigazione ".',
                 "Seleziona l'intervallo di tempo che desideri cancellare.",
                 "Seleziona i dati (cronologia di navigazione, cookie e dati dei siti e immagini e file memorizzati nella cache) che desideri cancellare.",
                 "In 'Avanzate' sono disponibili ulteriori opzioni per cancellare le password salvate, i dati dei moduli e altro ancora.",
                 "Fai clic su 'Cancella dati' ."
            ]
          },
          {
title: "Come posso trasferire dati a un altro dispositivo tramite Bluetooth (ad esempio un'immagine)?",            
content:[
"Individua il file che desideri condividere sul tuo dispositivo.",
                 "Se desideri inviare solo un elemento, ad esempio una fotografia, toccalo e quindi tocca l'icona di condivisione.",
                 "Seleziona l'opzione di condivisione Bluetooth.",
                 "Scegli il dispositivo abilitato Bluetooth a cui inviare il file.",
                 "Accetta il file in arrivo sul dispositivo di destinazione."
            ]
          },
          {
title: "Come faccio a personalizzare le notifiche, il suono e la vibrazione per i messaggi in arrivo?",
            content:[
               "Avvia l'app di messaggistica.",
                 "All'interno dell'app, apri il menu Impostazioni",
                 'Scorri verso il basso fino alla sezione" Notifiche ".',
                 "Seleziona il menu 'Suono' per selezionare il suono desiderato.",
                 "Accanto a 'Vibrazione' spunta per abilitare / disabilitare la vibrazione per i messaggi in arrivo."
            ]
          },
          {
            title:"Come faccio a sapere che è disponibile un aggiornamento del dispositivo, come posso verificare di avere l'ultimo SW?",
            content:[
             "NOTA: quando è disponibile un nuovo firmware / software, le notifiche vengono inviate a tutti i dispositivi Blackview Phone.",
               "Nella schermata iniziale verrà visualizzata un'icona nel pannello delle notifiche. Quando viene visualizzata l'icona, puoi trascinare verso il basso il pannello delle notifiche e selezionare. ",
               "Per aggiornare manualmente:",
               "Vai al menu delle impostazioni.",
               "Scorri fino alla fine di questa schermata e seleziona 'Sistema' .",
               "Seleziona l'opzione 'Aggiornamento di sistema' .",
               "Seleziona l'opzione 'Verifica aggiornamenti' e segui le istruzioni.",
               "Nota: il dispositivo deve essere completamente carico prima di aggiornare il sistema."
            ]
          },
          {
            title: "Come risolvo quando si verifica una scarsa qualità del suono dopo l'immersione in acqua?",
            content:[
             "Per ripristinare il dispositivo, tenere premuto il pulsante di accensione per circa 10 secondi / finché non si avverte una vibrazione.",
               "Il dispositivo ora si accenderà, funzionerà e si caricherà come previsto."
            ]
          },
          {
           title: "Come si migliora la durata della batteria?",
            content:[
             'Le applicazioni (come Skype ™) che utilizzano frequentemente VOIP (Voice over IP) e altri dati tramite Wi-Fi o 3G / 4G possono ridurre notevolmente la durata della batteria. Disabilitare tali applicazioni quando si desidera la massima durata della batteria. ',
              'Imposta lo stato di sospensione del display su un inizio dopo 15 secondi di inattività. Per modificare le impostazioni di timeout del display: dalla schermata iniziale toccare> Impostazioni> Display> Avanzate> Sospensione> selezionare un tempo di ritardo più breve. ',
              "Riduci l'intensità del display. Per modificare la luminosità del display, Impostazioni> Display> Livello di luminosità> trascina la barra di controllo a sinistra per un display più scuro oa destra per un display più luminoso.",
              'Disabilita il Wi-Fi quando non lo usi. Per disabilitare il Wi-Fi: Impostazioni> Rete e Internet> tocca il pulsante di accensione / spegnimento in modo che non sia più verde. ',
              "Assicurati che il tuo telefono disponga degli ultimi aggiornamenti software. Per verificare la disponibilità degli ultimi aggiornamenti: Impostazioni> Sistema> Aggiornamento di sistema> Verifica aggiornamenti. ",
              "Interrompi l'esecuzione in background di qualsiasi programma non necessario installato: Impostazioni> App e notifiche> Visualizza tutte le app> seleziona e disabilita le app che non ti servono.",
              "Nota! Interrompi solo le applicazioni che hai installato. L'arresto di altre applicazioni preinstallate potrebbe causare errori o prestazioni scadenti del telefono. ",
            ]
          },
          {
title: "Come faccio a trovare il mio numero IMEI?",
             content:[
               "Si trova all'esterno della scatola in cui hai ricevuto il telefono e fa parte dell'etichetta di approvazione.",
               "Se la casella non è disponibile, digita nel dispositivo tramite la tastiera '* # 06 #' una finestra pop-up mostrerà l'IMEI del dispositivo.",
               "Seleziona Impostazioni, quindi Informazioni sul telefono e quindi Stato, ora avrai la possibilità di selezionare le informazioni IMEI."
             ]
          },
          {
title: "Cosa indicano i diversi colori del LED?",
             content:[
               "Rosso lampeggiante: avviso di batteria scarica inferiore al 15% del livello della batteria.",
               "Rosso fisso: il livello della batteria è compreso tra l'1% e il 99% ed è attualmente in carica.",
               "Verde fisso: la batteria è completamente carica.",
               "Blu lampeggiante: indica che è stata ricevuta una notifica (messaggio non letto, chiamata persa, e-mail, ecc.)",
             ]
          },
        ]
      }
    }
  }
</script>

<style scoped>
  #FAQ{
    background: #f1f1f1;
    padding: 60px 0px;

  }
  .faq-content{
    max-width: 1140px;
    margin: 0 auto;
    background: white;
    padding: 25px;
  }
  h2{
    background-color: #f5f5f5;
    text-indent: 40px;
    font-size: 24px;
    line-height: 60px;
    text-align: left;
    margin:0 -15px 15px -15px;
  }
  .faq-item{
    margin-bottom: 30px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0 10px 15px;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }



  .faq-item:hover{
    box-shadow: 8px 8px 10px rgba(0,0,0,.1);
  }
  .faq-item:hover p{
    color: #008cd6;
  }
  .faq-item:hover h4{
    color: #008cd6;
  }
  .faq-item:hover a{
    color: #008cd6;
  }
  .faq-item h4 {
    position: relative;
    font-size: 18px;
    line-height: 1.2em;
    margin-bottom: 14px;
    color: #000;
    text-align: left;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .faq-item h4:before {
    display: block;
    content: "";
    position: absolute;
    top: 6px;
    bottom: auto;
    left: -15px;
    right: auto;
    z-index: 1;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #000;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .faq-item p,.faq-item a{
    font-size: 14px;
    line-height: 1.5em;
    margin-bottom: 10px;
    color: #666;
    text-align: left;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }

</style>
