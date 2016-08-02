let CategoryList = React.createClass({
  render: function() {
    let categories = this.props.categories;
    let rows = !this.props.categories.length ? 
        <li><h1>No Category</h1></li>:
        categories.map(function(cat) {
          return (<Category key={cat.id} categories={cat}></Category>);
        });
    return (
      <div className="category__wrap">
        <div className='category__title'><h2>Category List</h2></div>
        <div className='category__content'>
          <ul>{rows}</ul>
        </div>
        <CategoryForm />
      </div>
    );
  }
});

 const TodoStorage = AppStorage;
 var Category = React.createClass({
    render: function() {
      let category = this.props.categories;
      return (<li>- {category.value}</li>);
    }
  });
