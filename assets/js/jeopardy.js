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
    var column_width = new String(12 / data.length).replace(".", "-");
    $.each(data, function (id, category) {
      category_div = $('.category').first().clone();
      category_div.hide();
      category_div.removeClass('hidden');
      category_div.addClass('col-md-' + column_width);
      category_div.addClass('category__' + id);
      category_div.appendTo("#category-container");
      category_div.find(".category-heading").html(category['name']);
      category_div.find(".category-desc").html(category['description']);
      category_div.fadeIn();

      // Set lightning round class.
      if (id < 5) {
        category_div.addClass('category__normal');
      } else {
        category_div.addClass('category__lightning');
      }

      $.each(category['questions'], function (id, question) {
        question_div = category_div.find('.question').first().clone();
        question_div.hide();
        question_div.removeClass('hidden');
        question_div.appendTo(category_div);
        question_div.html("<b>" + question['label'] + "</b>");
        question_div.data('question', question['q']);
        question_div.data('answer', question['a']);
        question_div.fadeIn();
      })
    })
  })

$(document).on('click', '.question', function(){
  console.log($(this).data('question'));

  // Play correct audio.
  if ($(this).parent().hasClass('category__normal')) {
    new Audio('assets/audio/question_button.mp3').play();
  } else {
    new Audio('assets/audio/lightning_round.mp3').play();
  }

  $( this ).removeClass('btn-success');
  $( this ).addClass('btn-secondary');
  $('#question-modal').find('.modal-question').html($(this).data('question'));
  if ($(this).data('answer').includes('.html')) {
    $('#answer-modal').find('.modal-body').load($(this).data('answer'));
  } else {
    $('#answer-modal').find('.modal-body').html($(this).data('answer'));
  }
})

$(document).on('click', '#answer-modal', function(){
  $("#answer-modal").modal('hide')
});

$(document).on('click', '#question-continue', function(){
  $("#question-modal").modal('hide')
});
$('#question-wrong').on('click', function(){
  console.log("Wrong answer!");
  new Audio('assets/audio/failjingle.ogg').play();
});

var audio = null;
$(document).on('keydown', function(event) {
  console.log(event.which);
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  switch (event.which) {
    case 87: // lowercase w
	  if (audio) {
	    audio = null;
		return;
	  }
      audio = new Audio('assets/audio/failjingle.ogg');
      audio.play();
      break;
    case 77: // lowercase m
	  if (audio) {
	    audio = null;
		return;
	  }
      audio = new Audio('assets/audio/think.mp3');
      audio.play();
      break;
    case 67: // lowercase c
      audio = new Audio('assets/audio/correct_beep.wav');
      audio.play();
      break;
    case 66: // lowercase b
      audio = new Audio('assets/audio/buzzer.wav');
      audio.play();
      break;
    case 81: // lowercase q
      return;
      break;
  }
});
