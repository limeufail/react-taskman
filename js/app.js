(function(){
  'use strict';
  let TodoStorage = AppStorage;
  let App = React.createClass({
    getInitialState: function() {
      return {
        todos: [],
        categories: [],
        chartdata: [],
        page: 'active',
        isTaskFormVisible: false,
        isCatFormVisible: false
      };
    },
    componentDidMount: function() {
      let setTodoState = function(){
        TodoStorage.getAll(function(todos) {
          this.setState({
            todos: todos
          });
        }.bind(this));
      }.bind(this);
      TodoStorage.on('change', setTodoState);
      setTodoState();

      let setCategories = function(){
        TodoStorage.getCategories(function(categories) {
          this.setState({
            categories: categories
          });
        }.bind(this));
      }.bind(this);
      setCategories();
    
      let setChartData = function(){
        TodoStorage.getChartData(function(data) {
          this.setState({
            chartdata: data
          });
        }.bind(this));
      }.bind(this);
      setChartData();

      let setActivePage = () => {
        this.setState({ page: 'active'});
      }
      
      let setCompletedPage = () => {
        this.setState({ page: 'completed' });
      }
      
      let setCatPage = () => {
        this.setState({ page: 'category' });
      }
      
      let setChartPage = () => {
        this.setState({ page: 'chart' });
      }

      let router = Router({
        '/active': setActivePage,
        '/completed': setCompletedPage,
        '/category': setCatPage,
        '/reports': setChartPage,
        '*': setActivePage,
      });
      router.init();
    },
    toggleTaskForm: function () {
       this.setState({isTaskFormVisible: !this.state.isTaskFormVisible});
    },
    toggleCatForm: function () {
       this.setState({isCatFormVisible: !this.state.isCatFormVisible});
    },
    render: function() {
      let page = ''; 
      switch(this.state.page){
        case 'active': page = <TodoList todos={this.state.todos} categories={this.state.categories} />; 
                       break;
        case 'completed':page = <CompletedTodoList todos={this.state.todos} categories={this.state.categories} />; 
                         break;
        case 'category': page = <CategoryList categories={this.state.categories} />;
                         break;
        case 'chart' : <LineChart data={this.state.chartdata} width={600} height={300} />;
                          break;
      }
      let taskFormPage = this.state.isTaskFormVisible ? <TodoForm onClick={this.toggleTaskForm} /> : null;     
      let catFormPage = this.state.isCatFormVisible ? <CategoryForm /> : null;     
      let formPage = this.state.page == 'category'?catFormPage : taskFormPage;
      return (
        <div>
          <header className='header'>
            <ul className='header__menu'>
              <li><a href="#/active" onClick={this.toggleTaskForm}><i className="fa fa-plus"></i> Add Task</a></li>
              <li><a href="#/category"><i className="fa fa-braille"></i> Add Category</a></li>
              <li><a href="#/active"><i className="fa fa-list"></i> Active</a></li>
              <li><a href="#/completed"><i className="fa fa-check"></i> Completed</a></li>
              <li><a href="#/reports"><i className="fa fa-bar-chart"></i> Reports</a></li>
            </ul>
          </header>
          {page}
          {formPage}
        </div>
      );
    }
  });

  React.render(
    <App></App>,
    document.getElementById('app-container')
  );
})();
