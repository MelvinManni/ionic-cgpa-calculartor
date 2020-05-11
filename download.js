$('#clear').click(function (e) {
  e.preventDefault();
  console.log('K');
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML($('#div_idthisOne'), 15, 15, function () {
      pdf.save('div.pdf');
    });
});
