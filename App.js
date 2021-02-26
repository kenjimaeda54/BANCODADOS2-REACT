import React, { Component } from 'react';
import firebase from 'firebase';

class App extends Component{
   constructor(props){
     super(props);
     this.state={
       token:'',
       nome:'',
       idade:'',
       nomeInput:'',
       idadeInput:'',
       tokeInput:'',
       novoInput:'',
       novoNome:'',
       novaIdade:''      
     }
    let firebaseConfig = {
      apiKey: "AIzaSyAhMDu2fkhx607Y-4aFfX7mrf9iJ81I00M",
      authDomain: "reactudemy-24d1f.firebaseapp.com",
      databaseURL: "https://reactudemy-24d1f-default-rtdb.firebaseio.com",
      projectId: "reactudemy-24d1f",
      storageBucket: "reactudemy-24d1f.appspot.com",
      messagingSenderId: "768025376357",
      appId: "1:768025376357:web:99c5c87fe90cdd99abf88c"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {      
      firebase.initializeApp(firebaseConfig);
  }   
    firebase.database().ref('Token').on('value',(snapshot)=>{
            let estado= this.state;
            estado.token = snapshot.val();
            this.setState(estado);
    })  
  
    firebase.database().ref('Usuarios').child(1).on('value',(snapshot)=>{
            let estado = this.state;
            estado.nome = snapshot.val().nome;
            this.setState(estado);
         
    })
    firebase.database().ref('Usuarios').child(1).on('value',(snapshot)=>{
            let estado = this.state;
            estado.idade = snapshot.val().idade;
            this.setState(estado);
    })

    this.usuario     = this.usuario.bind(this);
    this.token       = this.token.bind(this);
    this.deletaToken = this.deletaToken.bind(this);
    this.deletaNome  = this.deletaNome.bind(this);
    this.deletaIdade = this.deletaIdade.bind(this);
    this.cargo       = this.cargo.bind(this);
    this.novoFilho   = this.novoFilho.bind(this);
  } 
  token(){
    firebase.database().ref('Token').set(this.state.tokenInput);

  }
  
  usuario(){
    firebase.database().ref('Usuarios').child(1).child('nome').set(this.state.nomeInput);
    firebase.database().ref('Usuarios').child(1).child('idade').set(this.state.idadeInput);
  }
  deletaToken(){
    firebase.database().ref('Token').remove();
  }
  deletaNome(){
    firebase.database().ref('Usuarios').child(1).child('nome').remove();
  }
  deletaIdade(){
    firebase.database().ref('Usuarios').child(1).child('idade').remove();
  }
  //nesta função estou apenas adicionando um novo child no database não vou mostrar na tela
  cargo(){
    firebase.database().ref('Usuarios').child(1).child('cargo').set(this.state.novoInput);
  }
  //adiconado um novo usuario completo com nome e idade,chave sera aleatorio
  //na tela não vai mostrar nada,so vai aparecer na tela database
  novoFilho(){
    let novoUsuario= firebase.database().ref('Usuarios');
    let chave = novoUsuario.push().key;
    novoUsuario.child(chave).set({
         nome: this.state.novoNome,
         idade:this.state.novaIdade

    });
  
  }
  
   render(){
      const{nome,idade,token,novoInput,novoNome,novaIdade} = this.state;  
      return(
          <div>
             <form onSubmit={this.usuario}>
               <input type="text" value={this.state.nomeInput} 
                      onChange={(e) => this.setState({nomeInput:e.target.value})}/>
                <input type="text" value={this.state.idadeInput} 
                      onChange={(e) => this.setState({idadeInput:e.target.value})}/>
               <button type='submit' >Cadastrar/Usuario</button>
             </form> <br/>
             <form onSubmit={this.token}>
             <input type="text" value={this.state.tokenInput} 
                      onChange={(e) => this.setState({tokenInput:e.target.value})}/>
             <button type='submit'>Cadastar/Token</button>
             </form>
             <form onSubmit={this.cargo}>
             <input type="text" value={this.state.novoInput} 
                      onChange={(e) => this.setState({novoInput:e.target.value})}/>
             <button type='submit'>Cadastar/cargo</button>
             </form>
             <form onSubmit={this.novoFilho}>
             <input type="text" value={this.state.novoNome} 
                      onChange={(e) => this.setState({novoNome:e.target.value})}/>
             <input type="text" value={this.state.novaIdade} 
                      onChange={(e) => this.setState({novaIdade:e.target.value})}/>
             <button type='submit'>Cadasta novo Usuario</button>
             </form>
             <h5>{token}</h5>
             <button onClick={this.deletaToken}>Deleta/token</button>
             <h1>{nome}</h1>
             <button onClick={this.deletaNome}>Deleta/nome</button>
             <h3>idade:{idade} <br/>
             </h3>           
             <button onClick={this.deletaIdade}>Deleta/caracteristicas</button>
          </div>
        );
      }
}


export default App;
