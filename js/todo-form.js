var TodoForm = TodoForm || {};

(function(){
  'use strict';

  let TodoStorage = AppStorage;
  TodoForm = React.createClass({
    getInitialState: function() {
      return {
        name: '',
        category: '',
        categories: [] 
      };
    },
    componentWillMount: function() {
      let getCategories = function(){
        TodoStorage.getCategories(function(data) { 
          this.setState({
            categories: data
          });
        }.bind(this));
      }.bind(this);
      getCategories();
    },
    handleNameChange: function(e) {
      this.setState({
        name: e.target.value
      });
    },
    handleCatChange: function(e) {
      this.setState({
        category: e.target.value
      });
    },
    handleFromDateChange: function(e) {
      this.setState({
        fromdate: e.target.value
      });
    },
    handleToDateChange: function(e) {
      this.setState({
        duedate: e.target.value
      });
    },
    handleSubmit: function(e) {
      e.preventDefault();
      let formdata = { name: this.state.name.trim(), category: this.state.category, fromdate: this.state.fromdate, duedate: this.state.duedate }
      TodoStorage.create(formdata,true, (error) => {
        if(!error) {
          this.setState({
            name: '',
            category: ''
          });
        }
      });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return this.state.name !== nextState.name;
    },
    propTypes: {
        onClick:   React.PropTypes.func
    },
    toggleTaskForm: function (e) {
       e.preventDefault();
       if (typeof this.props.onClick === 'function') {
            this.props.onClick(e.target.value);
        }
    },
    render: function() {
      let disabled = this.state.name.trim().length <= 0;
      let list = this.state.categories.map(function(cat) {
         return (<option key={cat.id} value={cat.id}>{cat.value}</option>);
      });
      
      return (
       <div className='form-todos__wrap'>
        <form onSubmit={this.handleSubmit} className='form-todos'>
          <div className='form-input__control'>
            <div className='form-input__control-group'>
              <label htmlFor='category'>Category</label>
              <select id="category" onChange={this.handleCatChange}>
                <option></option>
                {list}
              </select>
            </div>
            <div className='form-input__control-group'>
              <label htmlFor='category'>Task Name</label>
              <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
            </div>
            <div className='form-input__control-group'>
              <label htmlFor='category'>Start Date</label>
              <input id='fromDate' type='date' onChange={this.handleFromDateChange}></input>
            </div>
            <div className='form-input__control-group'>
              <label htmlFor='category'>Due Date</label>
              <input id='toDate' type='date' onChange={this.handleToDateChange}></input>
            </div>
          </div>
          <div className='form-control'>
            <input type="submit" value="Add Task" disabled={disabled} className='form__btn form__btn--blue'></input>
            <input type="submit" value="Cancel" className='form__btn form__btn--gray' onClick={this.toggleTaskForm}></input>
          </div>  
        </form>
       </div>
      );
    }
  });

})()