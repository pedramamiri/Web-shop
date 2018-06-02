const HelloComponent = {
    
    template:`
    <div>
      <h1>{{title}}</h1>
      <p>{{description}}</p>
    </div>
    `,
    data(){
        return{
            title:"Welcome to the store",
            description:"The greatest store"
        }
    }
}