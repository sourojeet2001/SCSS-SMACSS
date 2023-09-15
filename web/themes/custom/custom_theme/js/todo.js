/**
 * @file
 * Custom Theme behaviors.
 */

/**
 * This function adds a todo list functionality on the website.
 */
(function ($, Drupal, once) {
  var listContainer;
  Drupal.behaviors.todoList = {
    attach(context, settings) {
      once('newTest', '.todo', context).forEach(function (element) {
        var data = [];
        listContainer = $('.list__container', context);
        $(".todo", context).click(function (event) {
          var inputVal = $('.todoitem').val();
          event.preventDefault();
          let li = document.createElement('li');
          li.innerHTML = inputVal;
          listContainer.append(li);
          data.push(li.innerHTML);
          console.log(data);
          let span = document.createElement('span');
          span.classList.add('remove');
          span.innerHTML = "\u00d7";
          li.append(span);
          saveData();
        });

        $(".list__container", context).click(function (e) {
          if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
            saveData();
          } 
          else if (e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            saveData();
          }
        });

        function saveData() {
          if (listContainer) {
            localStorage.setItem('data', data);
          }
        }

        function showList() {
          const data = localStorage.getItem('data');
          const dataArray = data.split(',');

          if (dataArray.length) {
            dataArray.forEach(item => {
              const listItem = document.createElement('li');
              listItem.innerHTML = item;
              listContainer.append(listItem);
              let span = document.createElement('span');
              span.classList.add('remove');
              span.innerHTML = "\u00d7";
              listItem.append(span);
            });
          } 
        }
        
        showList();
        
      });
    },
    
  };
})(jQuery, Drupal, once);

