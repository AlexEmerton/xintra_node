function getCurrentSelected(){
  var opt = document.getElementById('module_select');
  var opt_value  = opt.options[opt.selectedIndex].value;
  // console.log(opt_value);
  return opt_value;
}

function unhide__module(){
  var ism = document.getElementById("bloodhound__ism");
  var pic = document.getElementById("bloodhound__pic");
  var ism_list = document.getElementById("list_ism");
  var pic_list =  document.getElementById("list_pic");
  var info = document.getElementById("started");

  var option = getCurrentSelected();

  if (option == 'ism'){
    info.setAttribute('hidden', 'true');

    if (ism.getAttribute('hidden') == 'true'){
      ism.removeAttribute('hidden');
      ism_list.removeAttribute('hidden');
    }
    if (pic.getAttribute('hidden') != 'true'){
      pic.setAttribute('hidden', 'true');
      pic_list.setAttribute('hidden', 'true');
    }
  } else if (option == 'pic'){
    info.setAttribute('hidden', 'true');

    if (pic.getAttribute('hidden') == 'true'){
      pic.removeAttribute('hidden');
      pic_list.removeAttribute('hidden');
    }
    if (ism.getAttribute('hidden') != 'true'){
      ism.setAttribute('hidden', 'true');
      ism_list.setAttribute('hidden', 'true');
    }
  }
}

function renderSearch__ism(topics_l) {
  var topics = topics_l;

  // constructs the suggestion engine
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: topics
  });

  $('#bloodhound__ism .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'topics',
    source: engine,
    templates: {
      empty: [
      '<div class="empty-message">',
      'Unable to find any topics that match current query',
      '</div>'
      ].join('\n'),
      suggestion: function(topics) {return ('<p><a href="/result?mod=' + getCurrentSelected() + '&topic=' + topics +'">' + topics + '</a></p>'); }
    }
  });
}

function renderSearch__pic(topics_l) {
  var topics = topics_l;

  // constructs the suggestion engine
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: topics
  });

  $('#bloodhound__pic .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'topics',
    source: engine,
    templates: {
      empty: [
      '<div class="empty-message">',
      'Unable to find any topics that match current query',
      '</div>'
      ].join('\n'),
      suggestion: function(topics) {return ('<p><a href="/result?mod=' + getCurrentSelected() + '&topic=' + topics +'">' + topics + '</a></p>'); }
    }
  });
}
