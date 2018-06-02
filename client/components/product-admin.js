const ProductAdminComponent = {
    props: ['item'],
    template: `
      <div>
        <h3>Lägga till produkter</h3>
        <form @submit.prevent="submit">
          <label style="margin-right:10px;">Name
            <input type="text" v-model="name" :disabled="loading" required />
          </label>
          <br/>
          <label>Beskrivning
            <input type="text" v-model="description" :disabled="loading" />
          </label>
          <br/>
          <label style="margin-right:10px;">Artnummer
            <input type="text" v-model="artnr" :disabled="loading" />
          </label>
          <br/>
          <label>Pris exkl moms
            <input type="text" v-model="price" :disabled="loading" />
          </label>
          <br/>
          <label style="margin-right:10px;">Moms
            <input type="text" v-model="vat" :disabled="loading" placeholder="0.25" />
          </label>
          <br/>
          <div>Kategorier</div>
         <div                
            v-for="item in categories"
            v-bind:item="item"
            v-bind:key="item._id">
            <input type="checkbox" :id="item.name" v-model="selectedCategories" :value="item._id">
            <label :for="item.name">{{item.name}}</label>
          </div>
          <button type="submit" :disabled="loading">Spara</button>
          <br/>
          <span v-if="message">{{message}}</span>
        </form>
      </div>
    `,
    data() {
      return {
        name: '',
        description: '',
        price:0,
        vat:0.25,
        artnr:'',
        message:'',
        categories:[],
        selectedCategories:[],
        loading: false
      };
    },
    methods: {
      submit() { // save a product
        this.loading = true;
        http.post('/rest/products', {
            name: this.name,
            description: this.description,
            price:this.price,
            vat:this.vat,
            artnr:this.artnr,
            categories:this.selectedCategories
        }).then(response => {
          console.log(response);
          this.loading = false;
          if(response.data.name) {
            this.message = 'product saved';
          } else {
            this.message = 'save failed';
          }
        }).catch(error => {
          this.loading = false;
          this.message = 'save failed';
        });
      }
    },
    async created(){
      let categories = await http.get('/rest/categories');
      if(categories.data){
        this.categories = categories.data;
      }
    
    }
    
  }
