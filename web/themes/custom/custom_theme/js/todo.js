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
        var storedData = JSON.parse(localStorage.getItem('data')) || [];
        listContainer = $('.list__container', context);
        $(".todo", context).click(function (event) {
          var inputVal = $('.todoitem').val();
          event.preventDefault();
          let li = document.createElement('li');
          li.innerHTML = inputVal;
          listContainer.append(li);
          data.push(li.innerHTML);
          let span = document.createElement('span');
          span.classList.add('remove');
          span.innerHTML = "\u00d7";
          li.append(span);
          saveData();
          $('.todoitem').val('');
        });

        $(".list__container", context).click(function (e) {
          if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
            saveData();
          } 
          else if (e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            data.pop(e.target.parentElement);
            saveData();
          }
        });
        function saveData() {
          if (listContainer) {
            if (data.length === 0) {
              return;
            }
            let existingData = JSON.parse(localStorage.getItem('data')) || [];
            if (existingData) {
              existingData = existingData.concat(data);
              localStorage.setItem('data', JSON.stringify(existingData));
            }
            else {
              localStorage.setItem('data', JSON.stringify(data));
            }
          }
        }

        function showList() {
          if (storedData.length) {
            storedData.forEach(item => {
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

        function clearLocalStorageByValue(value) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const storedValue = localStorage.getItem(key);
        
            if (storedValue === value) {
              localStorage.removeItem(key);
            }
          }
        }
      });
    },
    
  };
})(jQuery, Drupal, once);
