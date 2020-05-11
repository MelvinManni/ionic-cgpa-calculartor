$(function () {
  //initialization and delclaration
  let unit = document.getElementsByClassName('cunit');
  let name = document.getElementsByClassName('cname');
  let grade = document.getElementsByClassName('cgrade');
  let resultHolder = document.getElementById('result-holder');
  let calc = document.getElementById('calculate');
  let totalUnit = 0;
  let totalGrade = 0;
  let gpa = 0;
  let cgpa = 0.0;

  //   adding course detail inputs
  $('#add').click(function (e) {
    resultHolder.className = 'zoomInUp';
    setTimeout(() => {}, 100);

    e.preventDefault();
    let div = document.createElement('div');
    div.className = 'course-details';
    div.innerHTML = courseDetails;
    $('.course-holder').append(div);
    del();
  });

  //   adding course detail inputs ends

  //clearing input fields===

  $('#clear').click(function (e) {
    e.preventDefault();

    $('.cname').val('');
    $('.cunit').val('');
    $('.cgrade').val('');
  });


  // deletin course details

  $('.course-holder').on('click', '.delete', del);

  // deletin course details ends

  //calculating CGPA
  $('#calculate').click(function (e) {
    for (let index = 0; index < unit.length; index++) {
      totalUnit += parseInt(unit[index].value);
      totalGrade += parseInt(grade[index].value);
      gpa += totalGrade * totalUnit;

      addingCourseResult(
        name[index].value,
        unit[index].value,
        grade[index].value
      );
    }

    cgpa += parseFloat(gpa / totalUnit).toFixed(1);
    if (gpa === undefined || isNaN(cgpa) || cgpa === 'NaN') {
      presentAlert();
    } else {
      resultHolder.style.visibility = 'visible';
      resultHolder.className = 'animate__fadeInDown';
      $('#cgpa').text(cgpa.replace(/^0+/, ''));
    }

    e.preventDefault();
  });
  //calculating CGPA

  $('.back').click(function (e) {
    e.preventDefault();

    resultHolder.className = 'animate__fadeOutDown';
    resultHolder.style.visibility = 'collapse';
    for (let i = 0; i < unit.length; i++) {
    }

    $('.remove').remove();
    $('#cgpa').text('');
    totalUnit = 0;
    totalGrade = 0;
    gpa = 0;
    cgpa = 0.0;
  });

  //functions
  function del() {
    $(this).parents('.course-details').css('display', 'none');
  }

  let courseDetails = `
    
                    <ion-button class="delete" fill="clear">
                      <ion-icon name="close-outline"></ion-icon>
                    </ion-button>
                    <ion-item>
                      <ion-label position="floating">Course Name </ion-label>
                      <ion-input required name="cname" type="text"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label position="floating">
                        Course Unit <ion-text color="danger">*</ion-text>
                      </ion-label>
                      <ion-input
                        required
                        name="cunit"
                        type="number"
                        class="cunit"
                      ></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label
                        >Grade<ion-text color="danger">*</ion-text>
                      </ion-label>
                      <ion-select cgrade multiple="false" placeholder="Select Grade">
                        <ion-select-option value="5">A</ion-select-option>
                        <ion-select-option value="4">B</ion-select-option>
                        <ion-select-option value="3">C</ion-select-option>
                        <ion-select-option value="2">D</ion-select-option>
                        <ion-select-option value="1">E</ion-select-option>
                        <ion-select-option value="0">F</ion-select-option>
                      </ion-select>
                    </ion-item>`;

  function addingCourseResult(cname, cunit, cgrade) {
    let item = document.createElement('ion-item');
    item.className = 'ion-no-margin ion-no-padding remove';
    item.innerHTML = `<ion-item>
                            <ion-grid>
                              <ion-row>
                                <ion-col size="4"
                                  ><ion-label class ='clear'>${cname}</ion-label></ion-col
                                >
                                <ion-col size="4"
                                  ><ion-label class ='clear'>${cunit}</ion-label></ion-col
                                >
                                <ion-col size="4"
                                  ><ion-label class ='clear'>${cgrade}</ion-label></ion-col
                                >
                              </ion-row>
                            </ion-grid>`;
    $('#courseResult').append(item);
  }

  function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Opps!';
    alert.subHeader = '';
    alert.message =
      'Seems like there was an error, please fill all required fields';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }
});
