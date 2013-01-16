  // Sample using dynamic pages with turn.js
  var numberOfPages = 1000;


  // Adds the pages that the book will need
  function addPage(page, book) {
    // 	First check if the page is already in the book
    if (!book.turn('hasPage', page)) {
      // Create an element for this page
      var element = $('<div />', {
        'class': 'page ' + ((page % 2 == 0) ? 'odd' : 'even'),
        'id': 'page-' + page
      }).html('<i class="loader"></i>');
      // If not then add the page
      book.turn('addPage', element, page);
      // Let's assum that the data is comming from the server and the request takes 1s.
      setTimeout(function () {
        if (page == 2) {
          element.html('<img src=calender.jpg height=500 width=400>');
        } else if (page == 3) {
          element.html('<h1 align=center>INDEX</h1><table border=1 align=center><tr><th>Sr No</th><th>Topic</th><th>PageNo</th></tr><tr><td align=center>1</td><td align=center>Diary</td><td align=center>4</td></tr><tr><td align=center>2</td><td align=center>To-do</td><td align=center>369</td></tr><tr><td align=center>3</td><td align=center>Events</td><td align=center>370</td></tr></table>');
        } else if(page == 5) {
        //code for notes
        element.html('<h1 align=center>NOTES</h1><h2><section contenteditable="true" id="content" style="padding-left:30px; font-family: Sacramento, cursive;">Go ahead, edit away!</section></h2> <ul id="docList"></ul><input type="text" id="docName" placeholder="Please Enter File Name" style="width: 200px;" /><input type="submit" value="Save" onclick="saveDoc(); return false;"/>');
        }
 
        else element.html('<div class="data">Data for page ' + page + '</div>');
      }, 1000);
    }
  }

  $(window).ready(function () {
    $('#book').turn({
      acceleration: true,
      pages: numberOfPages,
      elevation: 50,
      gradients: !$.isTouch,
      when: {
        turning: function (e, page, view) {

          // Gets the range of pages that the book needs right now
          var range = $(this).turn('range', page);

          // Check if each page is within the book
          for (page = range[0]; page <= range[1]; page++)
          addPage(page, $(this));

        },

        turned: function (e, page) {
          $('#page-number').val(page);
        }
      }
    });

    $('#number-pages').html(numberOfPages);

    $('#page-number').keydown(function (e) {

      if (e.keyCode == 13) $('#book').turn('page', $('#page-number').val());

    });
  });

  $(window).bind('keydown', function (e) {

    if (e.target && e.target.tagName.toLowerCase() != 'input') if (e.keyCode == 37) $('#book').turn('previous');
    else if (e.keyCode == 39) $('#book').turn('next');

  });
