export class rowSelections {
  totItemChecked: number = 0;
  allSelected: boolean = false;

  constructor() {}
  checkboxSelection(checkboxes) {
    // iterate all checkboxes
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        if (checkbox.closest('.dhx_header-rows')) {
          this.selectAll(checkbox, checkboxes);
        } else {
          // If all checks are selected then one of the check box from the body is unchecked then the state is set to Indeterminate.
          if (this.allSelected) {
            this.totItemChecked--;
            checkboxes[0].removeAttribute('checked');
            checkboxes[0].setAttribute('Indeterminate', '');
            this.allSelected = false;
          }
          // if the selected items get uncheck then decrease the selected items.
          else if (!checkbox.hasAttribute('checked')) {
            this.totItemChecked--;
          }
          // if items are clicked other than the header. The selected item counter will increase.
          // Also, if counter is grater or equal then the total check boxes in the body it will check the header as well.
          else {
            this.totItemChecked++;
            if (this.totItemChecked >= checkboxes.length - 1) {
              //  if all are checked in body then check the header as well.
              checkboxes[0].setAttribute('checked', '');
              this.allSelected = true;
            }
          }
        }
      });
    });
  }
  // All items are selected
  selectAll(current, allChecks) {
    allChecks.forEach(check => {
      if (current.hasAttribute('checked') && !current.hasAttribute('Indeterminate')) {
        check.setAttribute('checked', '');
        this.totItemChecked++;
        this.allSelected = true;
      } else {
        check.removeAttribute('checked');
        current.hasAttribute('Indeterminate') ? current.removeAttribute('Indeterminate') : '';
        this.totItemChecked = 0;
        this.allSelected = false;
      }
    });
  }
}
