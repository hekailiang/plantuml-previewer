$(function() {
  $('select').material_select();

  var $mode = $("#mode");

  var ls = window.localStorage;

  if (!ls) {
    console.error("this application needs local storage.");
  }

  var uml = ls && ls.getItem("uml");
  // if (uml) {
  //   $("#editor").html(uml);
  // }

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/diagram");

  var $form = $("#previewForm");

  plantumlPreviewer.finalize();

  $form.submit(function() {
    var uml = editor.getValue();
    // console.log(uml);

    ls && ls.setItem("uml", uml);

    $("#canvas").attr({
      uml: uml,
      src: null
    });

    plantumlPreviewer.initialize();
    plantuml_runonce();
    plantumlPreviewer.finalize();

    return false;
  }).submit();

  $mode.change(function() {
    var mode = $(this).val();

    addSubmitKey();

    ls && ls.setItem("mode", mode);
    editor.setKeyboardHandler(mode);
  });

  var mode = ls && ls.getItem("mode");
  if (mode) {
    $mode.val(mode).change();
  }

  function addSubmitKey() {
    editor.commands.addCommand({
    name: 'submit',
    bindKey: {win: 'Shift-Enter',  mac: 'Shift-Enter'},
    exec: function(editor) {
      $form.submit();
    },
    readOnly: false
    });
  }

  addSubmitKey();

});

