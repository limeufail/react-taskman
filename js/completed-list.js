let CompletedTodoList = React.createClass({
  render: function() {
    let categories = this.props.categories;
    let rows = !this.props.todos.length ? 
        <li><h1>No Completed Task</h1></li>:
        this.props.todos.filter(function(todo) {
          return todo.done;
        }).map(function(todo) {
          return (<Todo key={todo.id} todo={todo} categories={categories}></Todo>);
        });
    return (
      <div className="completed-todos__wrap">
        <div className='active-todos__title'><h2>Completed Task</h2></div>
        <div className='active-todos__content'>
          <ul>{rows}</ul>
        </div>
      </div>
    );
  }
});
