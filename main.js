// vue
const app = new Vue({
  el: '#app',
  data: {
    shop: [],
    items: [],
    showCart: false,
    verified: false,
    total_item: 0,
    memberid: "CUST001"
  },
  mounted() {
    axios.get("http://localhost:3000/items")
    .then(response => this.shop = response.data)
    .catch(err => console.log(err.message));
  },
  computed: {
    total() {
      var total = 0;
      total = this.items.reduce((sum, current) => sum + (current.quantity * current.price), 0);
      return total;
    }
  },
  methods: {
    check(item) {
      let retVal = confirm("are you sure?");
      if (retVal == true) {
        if (item.stock == 0) {
          alert('sorry, stock empty :(');
          return false;
        } else {
          console.log(JSON.stringify(item));
          this.addToCart(item);
        }
      } else {
        return false;
      }
    },
    addToCart(item) {
      let index = this.items.findIndex(element => element._id == item._id);
      if (index !== -1) {
        if (item.stock <= this.items[index].quantity) {
          alert('Maximal stock is ' + item.stock);
        } else {
          this.items[index].quantity++;
          this.total_item++;
          alert('add to cart success');
        }
      } else {
        item.quantity = 1;
        this.items.push(item);
        this.total_item++;
        alert('add to cart success');
      }
    },
    removeFromCart(item) {
      let index = this.items.findIndex(element => element._id == item._id);
      this.total_item = this.total_item - this.items[index].quantity;
      this.items.splice(index, 1);
    },
    checkOut() {
      let list_id = [];
      for (let item of this.items) list_id.push(item._id);
      console.log(JSON.stringify(list_id));
      let retVal = confirm("are you sure?");
      if (retVal == true) {
        buy(list_id, this.memberid, this.total);
        alert('Thank you for your purchase :)');
        window.location.href = "./index.html";
      } else {
        return false;
      }

      function buy(list, id, total) {
        axios.post("http://localhost:3000/carts", {
          memberid: id,
          itemlist: list,
          total: total
        })
        .then(response => this.shop = response.data)
        .catch(err => console.log(err.message));
      }

    }
  }
});
