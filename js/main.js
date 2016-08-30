window.onload = function () {

  'use strict';

  var Cropper = window.Cropper;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var actions = document.getElementById('actions');
  var dataX = document.getElementById('dataX');
  var dataY = document.getElementById('dataY');
  var dataHeight = document.getElementById('dataHeight');
  var dataWidth = document.getElementById('dataWidth');
  var dataRotate = document.getElementById('dataRotate');
  var dataScaleX = document.getElementById('dataScaleX');
  var dataScaleY = document.getElementById('dataScaleY');
  var options = {
        // aspectRatio: 16 / 9,
        aspectRatio: 2.2 / 1,
        preview: '.img-preview',
        ready: function (e) {
          // console.log(e.type);
        },
        cropstart: function (e) {
          // console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
          // console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
          updateWeb();
          // console.log(e.type, e.detail.action);
        },
        crop: function (e) {
          var data = e.detail;
          // console.log(e.type);
          dataX.value = Math.round(data.x);
          dataY.value = Math.round(data.y);
          dataHeight.value = Math.round(data.height);
          dataWidth.value = Math.round(data.width);
          // dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
          // dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
          // dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function (e) {
          console.log(e.type, e.detail.ratio);
        }
        ,autoCropArea: 0.432
      };

  var cropper = new Cropper(image, options);
  window.cropper = cropper;

  var _Cropper = window.Cropper;
  var _container = document.querySelector('.img-container');
  var _download = document.getElementById('download');
  var _actions = document.getElementById('actions');
  var _dataX = document.getElementById('dataX');
  var _dataY = document.getElementById('dataY');
  var _dataHeight = document.getElementById('dataHeight');
  var _dataWidth = document.getElementById('dataWidth');
  var _dataRotate = document.getElementById('dataRotate');
  var _dataScaleX = document.getElementById('dataScaleX');
  var _dataScaleY = document.getElementById('dataScaleY');
  var _options = {
        aspectRatio: 1.915 / 1,
        preview: '.img-preview',
        ready: function (e) {
          // console.log(e.type);
        },
        cropstart: function (e) {
          // console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
          // console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
          updateMobile();
          // console.log(e.type, e.detail.action);
        },
        crop: function (e) {
          var data = e.detail;
          // console.log(e.type);
          dataX.value = Math.round(data.x);
          dataY.value = Math.round(data.y);
          dataHeight.value = Math.round(data.height);
          dataWidth.value = Math.round(data.width);
          // dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
          // dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
          // dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function (e) {
          console.log(e.type, e.detail.ratio);
        }
        ,autoCropArea: 0.449
      };
  var _cropper = new Cropper(image, _options, true); // secondary = true
  window._cropper = _cropper;

  window.downloader = function(cropper, element, filename){
    cropper.getCroppedCanvas().toBlob(function (blob){
      element.download = filename + '.png';
      element.href = window.URL.createObjectURL(blob);
    });
  }

  window.updateWeb = function(){ downloader(cropper, document.querySelector('.download_web'), 'web'); }
  window.updateMobile = function(){ downloader(_cropper, document.querySelector('.download_mobile'), 'mobile'); }

  setTimeout(function(){

    downloader(cropper, document.querySelector('.download_web'), 'web');
    downloader(_cropper, document.querySelector('.download_mobile'), 'mobile');

  }, 1000);

  document.querySelector('.switch_web').addEventListener('click', function(e){
    jQuery('.cropper-container.primary').click()
  });

  document.querySelector('.switch_mobile').addEventListener('click', function(e){
    jQuery('.cropper-container.secondary').click()
  });

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // Buttons
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof download.download === 'undefined') {
    download.className += ' disabled';
  }


  // Options
  actions.querySelector('.docs-toggles').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropBoxData;
    var canvasData;
    var isCheckbox;
    var isRadio;

    if (!cropper) {
      return;
    }

    if (target.tagName.toLowerCase() === 'span') {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === 'label') {
      target = target.getElementsByTagName('input').item(0);
    }

    isCheckbox = target.type === 'checkbox';
    isRadio = target.type === 'radio';

    if (isCheckbox || isRadio) {
      if (isCheckbox) {
        options[target.name] = target.checked;
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();

        options.ready = function () {
          console.log('ready');
          cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        };
      } else {
        options[target.name] = target.value;
        options.ready = function () {
          console.log('ready');
        };
      }

      // Restart
      cropper.destroy();
      cropper = new Cropper(image, options);
    }
  };


  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option'),
      secondOption: target.getAttribute('data-second-option')
    };

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      if (data.method === 'getCroppedCanvas') {
        data.option = JSON.parse(data.option);
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {

            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.href = result.toDataURL('image/jpeg');
            }
          }

          break;

        case 'destroy':
          cropper = null;
          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  };

  document.body.onkeydown = function (event) {
    var e = event || window.event;

    if (!cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.charCode || e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  };


  // Import image
  var inputImage = document.getElementById('inputImage');
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          cropper.reset().replace(blobURL);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }
};
