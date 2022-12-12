  getTale1.addEventListener('dhx-table-is-ready', event => {
    // console.log('The i2c grid is ready and initialized ***', event);
    setTimeout(() => {
      if (event.detail) {
        const allCheckboxObj = getTale1.shadowRoot.querySelector('.dhx_header-row .dhx_grid-header-cell i2c-checkbox');

        checkboxes[0].addEventListener('click', event => console.log('event', event));
        let allElementClicked = false;
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].addEventListener('i2c-change', function (e) {
            console.log('this', this.checked, 'event', e);
            event.preventDefault();

            if (this.closest('.dhx_grid-header')) {
              for (var j = 1; j < checkboxes.length; j++) {
                checkboxes[j].click();
                j + 1 >= checkboxes.length ? (allElementClicked = true) : (allElementClicked = false);
              }
            }
            // if (allElementClicked && i !== 0) {
            //   console.log('checkboxes[0]', checkboxes[0]);
            //   checkboxes[0].removeAttribute('checked');
            //   checkboxes[0].setAttribute('indeterminate', '');
            // }
          });
        }

        allCheckboxObj.addEventListener('click', event => {
          event.stopImmediatePropagation();
          let itsCurrActiveState = event.target.hasAttribute('checked'),
            itsCurrIndeterminateState = event.target.hasAttribute('data-indeterminate')
              ? event.target.dataset.indeterminate
              : false,
            allTableBodyCheckboxes = document
              .querySelector('#dataTable1')
              .shadowRoot.querySelectorAll('.dhx_grid-row .dhx_grid-cell i2c-checkbox');

          if (itsCurrIndeterminateState === 'true' || itsCurrIndeterminateState === true) {
            allCheckboxObj.dataset.indeterminate = false;
            allCheckboxObj.removeAttribute('checked');
            itsCurrActiveState = false;
          }

          if (allTableBodyCheckboxes.length > 0) {
            allTableBodyCheckboxes.forEach(function (obj, index) {
              if (itsCurrActiveState) {
                obj.setAttribute('checked', '');
              } else {
                obj.removeAttribute('checked');
              }
            });
          }
        });
      }
    }, 1000);
  });
  
  window.checkboxSelection = function (that) {
    const totalCount = document
      .querySelector('#dataTable1')
      .shadowRoot.querySelectorAll('.dhx_grid-row .dhx_grid-cell i2c-checkbox').length;
    let currentCount = 0;
    document
      .querySelector('#dataTable1')
      .shadowRoot.querySelectorAll('.dhx_grid-row .dhx_grid-cell i2c-checkbox')
      .forEach(function (obj, index) {
        currentCount = obj.hasAttribute('checked') ? currentCount + 1 : currentCount;
      });

    const allCheckboxObj = document
        .querySelector('#dataTable1')
        .shadowRoot.querySelector('.dhx_header-row .dhx_grid-header-cell i2c-checkbox'),
      itsCurrIndeterminateState = allCheckboxObj.hasAttribute('data-indeterminate')
        ? allCheckboxObj.dataset.indeterminate
        : false;

    if (currentCount === totalCount) {
      if (!allCheckboxObj.hasAttribute('checked')) {
        if (itsCurrIndeterminateState !== 'true' || itsCurrIndeterminateState !== true) {
          allCheckboxObj.setAttribute('checked', '');
        } else {
          allCheckboxObj.removeAttribute('indeterminate');
          allCheckboxObj.dataset.indeterminate = false;
          allCheckboxObj.removeAttribute('checked');
        }
      }
    } else if (allCheckboxObj.hasAttribute('checked')) {
      allCheckboxObj.removeAttribute('checked');

      if (currentCount > 0 && currentCount < totalCount) {
        allCheckboxObj.setAttribute('indeterminate', '');
        allCheckboxObj.dataset.indeterminate = true;
      }
    } else if (currentCount === 0) {
      allCheckboxObj.removeAttribute('indeterminate');
      allCheckboxObj.dataset.indeterminate = false;
      allCheckboxObj.removeAttribute('checked');
    }
  };
