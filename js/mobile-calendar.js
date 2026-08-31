(() => {
  const sourceInput = document.querySelector(
    '.main-configurator-datepicker__input--from',
  );
  const picker = sourceInput
    ? window.jQuery(sourceInput).data('daterangepicker')
    : null;

  if (!picker) return;

  const pickerContainer = picker.container[0];
  const closeButton = pickerContainer.querySelector(
    '.ui-datepicker-group-close',
  );
  const mobileList = document.createElement('div');
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = moment().startOf('day');
  const firstMonth = today.clone().startOf('month');
  const lastMonth = firstMonth.clone().add(12, 'months').endOf('month');

  const fromHidden = document.querySelector('#dfrom');
  const toHidden = document.querySelector('#dto');
  const fromVisible = document.querySelector(
    '.main-configurator-datepicker__input--from',
  );
  const toVisible = document.querySelector(
    '.main-configurator-datepicker__input--to',
  );
  const mobileFromDate = document.querySelector(
    '.main-configurator-mobile__from-value-date',
  );
  const mobileToDate = document.querySelector(
    '.main-configurator-mobile__to-value-date',
  );
  const mobileFromTitle = document.querySelector(
    '.main-configurator-mobile__main-item-title--from',
  );
  const mobileToTitle = document.querySelector(
    '.main-configurator-mobile__main-item-title--to',
  );
  const desktopFromTitle = document.querySelector(
    '.main-configurator-datepicker__header--from',
  );
  const desktopToTitle = document.querySelector(
    '.main-configurator-datepicker__header--to',
  );
  const selectDatesButton = document.querySelector(
    '.main-configurator-mobile__button',
  );

  function parseStoredDate(input) {
    if (!input?.value) return null;
    const parsed = moment(input.value, 'MMDDYYYY', true);
    return parsed.isValid() ? parsed.startOf('day') : null;
  }

  let selectedStart = parseStoredDate(fromHidden);
  let selectedEnd = parseStoredDate(toHidden);

  mobileList.className = 'mobile-calendar-list';
  mobileList.setAttribute('aria-label', 'Choose parking dates');

  function buildCalendar() {
    const fragment = document.createDocumentFragment();

    for (let monthOffset = 0; monthOffset <= 12; monthOffset += 1) {
      const month = firstMonth.clone().add(monthOffset, 'months');
      const monthSection = document.createElement('section');
      const monthTitle = document.createElement('h3');
      const weekdays = document.createElement('div');
      const daysGrid = document.createElement('div');

      monthSection.className = 'mobile-calendar-month';
      monthTitle.className = 'mobile-calendar-month__title';
      monthTitle.textContent = month.format('MMMM YYYY');
      weekdays.className = 'mobile-calendar-weekdays';
      daysGrid.className = 'mobile-calendar-days';

      weekdayLabels.forEach((label) => {
        const weekday = document.createElement('span');
        weekday.textContent = label;
        weekdays.appendChild(weekday);
      });

      for (let blank = 0; blank < month.day(); blank += 1) {
        const spacer = document.createElement('span');
        spacer.className = 'mobile-calendar-day-spacer';
        spacer.setAttribute('aria-hidden', 'true');
        daysGrid.appendChild(spacer);
      }

      const daysInMonth = month.daysInMonth();
      for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
        const date = month.clone().date(dayNumber);
        const dayButton = document.createElement('button');

        dayButton.type = 'button';
        dayButton.className = 'mobile-calendar-day';
        dayButton.dataset.date = date.format('YYYY-MM-DD');
        dayButton.textContent = String(dayNumber);
        dayButton.setAttribute('aria-label', date.format('dddd, MMMM D, YYYY'));

        if (date.isBefore(today, 'day') || date.isAfter(lastMonth, 'day')) {
          dayButton.disabled = true;
        }

        daysGrid.appendChild(dayButton);
      }

      monthSection.append(monthTitle, weekdays, daysGrid);
      fragment.appendChild(monthSection);
    }

    mobileList.appendChild(fragment);
  }

  function setStartFields(date) {
    const label = date.format('DD MMM');

    fromHidden.value = date.format('MMDDYYYY');
    fromVisible.value = label;
    mobileFromDate.textContent = label;
    mobileFromDate.classList.add('is-active');
    mobileFromTitle.classList.add('is-active');
    desktopFromTitle.classList.add('is-active');
    fromVisible.classList.remove('is-error');
  }

  function clearEndFields() {
    toHidden.value = '';
    toVisible.value = '';
    mobileToDate.textContent = 'Date';
    mobileToDate.classList.remove('is-active');
    mobileToTitle.classList.remove('is-active');
    desktopToTitle.classList.remove('is-active');
    selectDatesButton.disabled = true;
  }

  function completeRange(start, end) {
    picker.setStartDate(start.clone());
    picker.setEndDate(end.clone());
    selectDatesButton.disabled = false;
  }

  function updateSelectionClasses() {
    mobileList.querySelectorAll('.mobile-calendar-day').forEach((button) => {
      const dateValue = button.dataset.date;
      const isStart =
        selectedStart && dateValue === selectedStart.format('YYYY-MM-DD');
      const isEnd = selectedEnd && dateValue === selectedEnd.format('YYYY-MM-DD');
      const isInRange =
        selectedStart &&
        selectedEnd &&
        dateValue > selectedStart.format('YYYY-MM-DD') &&
        dateValue < selectedEnd.format('YYYY-MM-DD');

      button.classList.toggle('is-start', Boolean(isStart));
      button.classList.toggle('is-end', Boolean(isEnd));
      button.classList.toggle('is-in-range', Boolean(isInRange));
      button.setAttribute(
        'aria-pressed',
        isStart || isEnd || isInRange ? 'true' : 'false',
      );
    });
  }

  mobileList.addEventListener('click', (event) => {
    const dayButton = event.target.closest('.mobile-calendar-day');
    if (!dayButton || dayButton.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    const clickedDate = moment(dayButton.dataset.date, 'YYYY-MM-DD', true);

    if (!selectedStart || selectedEnd) {
      selectedStart = clickedDate;
      selectedEnd = null;
      setStartFields(selectedStart);
      clearEndFields();
      picker.startDate = selectedStart.clone().startOf('day');
      picker.endDate = null;
    } else if (clickedDate.isBefore(selectedStart, 'day')) {
      selectedStart = clickedDate;
      setStartFields(selectedStart);
      clearEndFields();
      picker.startDate = selectedStart.clone().startOf('day');
      picker.endDate = null;
    } else {
      selectedEnd = clickedDate;
      completeRange(selectedStart, selectedEnd);
    }

    updateSelectionClasses();
  });

  buildCalendar();
  updateSelectionClasses();
  closeButton.insertAdjacentElement('afterend', mobileList);
})();
