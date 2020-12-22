<template>
  <div id="Vantaggi">
    <div class="vantaggi-content">
      <h2>Vantaggi dello Store Ufficiale Italiano</h2>
      <div class="vantaggi-item" v-for="item in vantaggiData">
        <h4>{{item.title}}</h4>
        <p v-for="key in item.content">{{key}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "vantaggi",
    data(){
      return {
        vantaggiData:[
          {
           title: 'Perchè Acquistare dallo Store Ufficiale?',
             content:[
                "Probabilmente ti starai domandando per quale motivo dovresti acquistare sullo Store italiano piuttosto che su quello internazionale o da altri rivenditori. Semplice! Ecco quali sono i vantaggi:",
                '1. Spedizioni Rapide e Gratuite: solo acquistando dal nostro Store puoi usufruire del magazzino europeo e di conseguenza di spedizioni rapide e gratuite. Il tuo ordine ti verrà recapitato in sole 24/48 ore!',
                "2. Zero costi aggiuntivi: dimentica i costi di dogana! Il prezzo che vedi è l'unica spesa che dovrai affrontare. Acquistando da altri Store dovrai attendere i tempi e affrontare i costi relativi alla dogana e alla spedizione dalla Cina.",
                "3. Assistenza a 360° in lingua italiana: contattandoci su Facebook o all'indirizzo italia@blackview.hk potrai ricevere tutte le informazioni riguardo agli acquisti effettuati o a quelli futuri.",        
                "4. Assistenza Tecnica in Europa: sei stato spesso abbandonato dopo un acquisto? Se acquisti dal nostro Store non succederà più. Per qualsiasi problema tecnico basterà contattare il nostro centro assistenza all'indirizzo italia@blackview.hk e ti verrà fornita la migliore assistenza per il caso specifico che hai  riscontrato. Se sarà necessario, ti forniremo il modulo e la procedura per spedire il device presso il nostro centro assistenza situato in Europa.",
                "5. Garanzia 24 Mesi",
                "Nota: SOLO acquistando dal nostro Store italiano potrai usufruire dei benefici indicati sopra. Non rispondiamo per acquisti effettuati sullo Store Internazionale o su altri rivenditori (anche se ufficiali).",             
                ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  #Vantaggi{
    background: #f1f1f1;
    padding: 60px 0px;

  }
  .vantaggi-content{
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
  .vantaggi-item{
    margin-bottom: 30px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0 10px 15px;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }

  .vantaggi-item:hover{
    box-shadow: 8px 8px 10px rgba(0,0,0,.1);
  }
  .vantaggi-item:hover p{
    color: #008cd6;
  }
  .vantaggi-item:hover h4{
    color: #008cd6;
  }
  .vantaggi-item:hover a{
    color: #008cd6;
  }
  .vantaggi-item h4 {
    position: relative;
    font-size: 18px;
    line-height: 1.2em;
    margin-bottom: 14px;
    color: #000;
    text-align: left;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }

  .vantaggi-item h4:before {
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
  .vantaggi-item p,.vantaggi-item a{
    font-size: 14px;
    line-height: 1.5em;
    margin-bottom: 10px;
    color: #666;
    text-align: left;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .vantaggi-item h4{
      font-size: 22px;
  }
  .vantaggi-item  :nth-child(2){
     font-size: 18px;
  }
</style>
