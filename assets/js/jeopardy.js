// URL parameter helper.
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if(results) {
    return results[1]
  } else {
    return null
  }
}

// Fetch JSON to build game HTML.
$.getJSON($.urlParam('file') || 'data/json/jeopardy-data.json')
  .done(function (data) {
    var column_width = new String(12 / data.length).replace(".", "-")
    $.each(data, function (id, category) {
      category_div = $('.category').first().clone()
      category_div.hide()
      category_div.removeClass('hidden')
      category_div.addClass('col-md-' + column_width)
      category_div.addClass('category__' + id)
      category_div.appendTo("#category-container")
      category_div.find(".category-heading").html(category['name'])
      category_div.find(".category-desc").html(category['description'])
      category_div.fadeIn()

      // Set lightning round class.
      if (id < 3) {
        category_div.addClass('category__normal');
      } else {
        category_div.addClass('category__lightning');
      }

      $.each(category['questions'], function (id, question) {
        question_div = category_div.find('.question').first().clone()
        question_div.hide()
        question_div.removeClass('hidden')
        question_div.appendTo(category_div)
        question_div.html("<b>" + question['label'] + "</b>")
        question_div.data('question', question['q'])
        question_div.data('answer', question['a'])
        question_div.fadeIn()
      })
    })
  })

$(document).on('click', '.question', function(){
  console.log($(this).data('question'))
  $( this ).removeClass('btn-success')
  $( this ).addClass('btn-secondary')
  $('#question-modal').find('.modal-question').html($(this).data('question'))
  if ($(this).data('answer').includes('.html')) {
    $('#answer-modal').find('.modal-body').load($(this).data('answer'))
  } else {
    $('#answer-modal').find('.modal-body').html($(this).data('answer'))
  }
})

$(document).on('click', '#answer-modal', function(){
  $("#answer-modal").modal('hide')
})

$(document).on('click', '#question-continue', function(){
  $("#question-modal").modal('hide')
})

$(document).ready(function() {
    var normalAudioElement = document.createElement('audio');
    var lightningAudioElement = document.createElement('audio');

    // This should be refactored but oh well.
    $('.category__normal button.question').click(function() {
        console.log('play normal mp3');
        normalAudioElement.setAttribute('src', 'assets/audio/question_button.mp3'); 
        normalAudioElement.setAttribute('type', 'audio/mp3');
        normalAudioElement.play();
    });

    $('.category__lightning button.question').click(function() {
        console.log('play lightning mp3');
        lightningAudioElement.setAttribute('src', 'assets/audio/lightning_round.mp3'); 
        normalAudioElement.setAttribute('type', 'audio/mp3');
        lightningAudioElement.play();
    });
});