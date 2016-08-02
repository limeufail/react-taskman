var AppStorage = AppStorage || {};

(function(){
  'use strict';
  let getIds = function(isTask){
    let rs =  isTask ? JSON.parse(localStorage.getItem('todos')) : JSON.parse(localStorage.getItem('categories'));
    let arrIds = [];
    if(rs){
      arrIds = rs.map(function(data){
                return data.id;
               });  
    }
    return arrIds;
  }

  let generateId = function(isTask) {
    let id = Math.floor(Math.random() * 1000);
    if(getIds(isTask).indexOf('_'+id) == -1)
    {
      return '_' + id++;
    }
    return generateId(isTask);
  };

  let todos =  JSON.parse(localStorage.getItem('todos')) || [];
  let categories = JSON.parse(localStorage.getItem('categories')) || [];
  let chartdata = {
    points: [
      [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
        { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
      [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
        { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
      [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
        { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    ],
    xValues: [0,1,2,3,4,5,6],
    yMin: 0,
    yMax: 30
  };

  AppStorage = {
    on: function(_, _callback) {
      this._onChangeCallback = _callback;
    },
    getAll: function(callback) {
      callback(todos);
    },
    getCategories: function(callback) {
      callback(categories);
    },
    getChartData: function(callback) {
      callback(chartdata);
    },
    complete: function(id) {
      for(var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        if(todo.id === id) {
          var newTodo = React.addons.update(todo, {done: {$set: true}});
          todos = React.addons.update(todos, {$splice: [[i, 1, newTodo]]});
          this.createLocally(true);
          this._onChangeCallback();
          break;
        }
      }
    },
    create: function(formdata, isTask, callback) {
      var newTodo = isTask ? 
            {
              id: generateId(true),
              name: formdata.name,
              category: formdata.category,
              fromdate: formdata.fromdate,
              duedate: formdata.duedate
            } :
            {
              id: generateId(false),
              value: formdata.name
            };

      if(isTask)            
        todos = React.addons.update(todos, {$push: [newTodo]});
      else
        categories = React.addons.update(categories, {$push: [newTodo]});
      this.createLocally(isTask);
      this._onChangeCallback();
      callback();
    },
    createLocally: function(isTask){
      isTask || false;
      if (typeof(Storage) == "undefined") {
        console.log('Web Storage Not Supported');
        return false;
      }
      let storageName = isTask ? 'todos' : 'categories';
      let data = isTask ? todos : categories;
      localStorage.setItem(storageName,JSON.stringify(data));
    }
  };

})();