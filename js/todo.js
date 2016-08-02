var Todo = Todo || {};

(function(){
  'use strict';

   const TodoStorage = AppStorage;
   let categoryName = '';
   Todo = React.createClass({
  	  handleClick: function() {
  	    TodoStorage.complete(this.props.todo.id);
  	  },
      componentWillMount: function() {
        this.getCategoryName()
      },
      getCategoryName: function(catId) {
        this.props.categories.map(function(cat){
          if(cat.id == catId){ categoryName = cat.value; }
        });
      },
  	  render: function() {
        let todo = this.props.todo;
        this.getCategoryName(todo.category);
        let doneButton = todo.done ? null : <button onClick={this.handleClick}><i className="fa fa-check-square-o fa-2x"></i></button>;
  	    return (<li>{doneButton} {todo.name} {categoryName} {todo.fromdate} {todo.duedate} </li>);
  	  }
    });

})();