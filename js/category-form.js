var CategoryForm = CategoryForm || {};

(function(){
  'use strict';

  let TodoStorage = AppStorage;
  CategoryForm = React.createClass({
    getInitialState: function() {
      return {
        name: ''
      };
    },
    componentWillMount: function() {
      // let getCategories = function(){
      //   TodoStorage.getCategories(function(data) { 
      //     this.setState({
      //       categories: data
      //     });
      //   }.bind(this));
      // }.bind(this);
      // getCategories();
    },
    handleCatNameChange: function(e) {
      this.setState({
        name: e.target.value
      });
    },
    handleSubmit: function(e) {
      e.preventDefault();
      let formdata = { name: this.state.name.trim() }
      TodoStorage.create(formdata, false, (error) => {
        if(!error) {
          this.setState({
            name: ''
          });
        }
      });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return this.state.name !== nextState.name;
    },
    render: function() {
      let disabled = this.state.name.trim().length <= 0;
      
      return (
       <div className='form-cat__wrap'>
        <form onSubmit={this.handleSubmit} className='form-cat'>
          <div className='form-input__control'>
            <div className='form-input__control-group'>
              <label htmlFor='category'>Category</label>
              <input type="text" value={this.state.name} onChange={this.handleCatNameChange}></input>
            </div>
          </div>
          <div className='form-control'>
            <input type="submit" value="Add Category" disabled={disabled} className='form__btn form__btn--blue'></input>
          </div>  
        </form>
       </div>
      );
    }
  });

})()