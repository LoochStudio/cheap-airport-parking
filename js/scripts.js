window.siblings = (el) =>
  [].slice.call(el.parentNode.children).filter((child) => child !== el);

window.showScrollBar = () => {
  document.querySelector('html').classList.remove('noskroll');
  document.querySelector('body').classList.remove('noskroll');
};

window.hideScrollBar = () => {
  document.querySelector('html').classList.add('noskroll');
  document.querySelector('body').classList.add('noskroll');
};

/* Accordion */

(() => {
  function accordionOpen(header, content) {
    header.classList.add('is-active');
    content.style.maxHeight = content.scrollHeight + 'px';
    setTimeout(() => {
      content.classList.add('is-active');
    }, 300);
  }

  function accordionClose(header, content) {
    content.classList.remove('is-active');
    header.classList.remove('is-active');
    setTimeout(() => {
      content.style.maxHeight = '0';
    }, 0);
  }

  const accordionItems = document.querySelectorAll('.js-accordion-item');
  accordionItems.forEach((el) => {
    const header = el.querySelector('.js-accordion-item-header');
    const content = el.querySelector('.js-accordion-item__content');

    if (!header && !content) return false;

    header.addEventListener('click', () => {
      if (!header.classList.contains('is-active')) {
        accordionOpen(header, content);

        return;
      }

      accordionClose(header, content);
    });

    if (el.classList.contains('is-default-open') && window.innerWidth > 1024) {
      accordionOpen(header, content);
    }
  });
})();

/* Popular Section Toggle */
(() => {
  const popularSection = document.querySelector('.popular-section');
  const actionBtns = document.querySelectorAll('.popular-section__action-btn');
  const toggle = document.querySelector('.popular-section__action-toggle');

  if (!popularSection || !actionBtns.length || !toggle) return;

  function setView(view) {
    // Update buttons
    actionBtns.forEach((btn) => {
      if (btn.dataset.view === view) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    // Update toggle
    if (view === 'map') {
      toggle.classList.add('is-map-active');
      popularSection.classList.add('popular-section--show-map');
    } else {
      toggle.classList.remove('is-map-active');
      popularSection.classList.remove('popular-section--show-map');
    }
  }

  // Button click handlers
  actionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      setView(view);
    });
  });

  // Toggle click handler
  toggle.addEventListener('click', () => {
    const isMapActive = toggle.classList.contains('is-map-active');
    setView(isMapActive ? 'list' : 'map');
  });
})();

/* Articles Section */

(() => {
  const articlesSection = document.querySelectorAll('.articles-section');

  if (!articlesSection.length) return;

  articlesSection.forEach((el) => {
    const slider = el.querySelector('.swiper');
    const prevArrow = el.querySelector('.articles-section__arrow.is-prev');
    const nextArrow = el.querySelector('.articles-section__arrow.is-next');

    if (!slider) {
      return;
    }

    const swiper = new Swiper(slider, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      navigation: {
        nextEl: nextArrow,
        prevEl: prevArrow,
      },
      breakpoints: {
        780: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  });
})();

/* Article Hero Slider */
(() => {
  const articleHeroSlider = document.querySelector('.article-hero-slider');
  if (!articleHeroSlider) return;

  const slider = articleHeroSlider.querySelector('.swiper');
  const swiper = new Swiper(slider, {
    slidesPerView: 'auto',
    spaceBetween: 12,
    loop: true,
    breakpoints: {
      780: {
        spaceBetween: 30,
        centeredSlides: true,
      },
    },
  });
})();

/* Header */
(() => {
  const header = document.querySelector('.header');

  if (!header) {
    return;
  }

  const headerBurger = header.querySelector('.header__burger');
  const headerBurgerMenu = document.querySelector('.header__nav-wr');
  const headerNavItems = document.querySelectorAll('.header__nav-item');
  const headerNavItemsMain = document.querySelectorAll('.header__nav-item-wr');

  if (headerBurger) {
    headerBurger.addEventListener('click', () => {
      headerBurgerMenu.classList.toggle('header__nav-wr--active');
      headerBurger.classList.toggle('header__burger--active');

      if (headerBurgerMenu.classList.contains('header__nav-wr--active')) {
        window.hideScrollBar();
      } else {
        window.showScrollBar();
      }
    });
  }

  headerNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.closest('.header__nav-item-wr').classList.add('is-child');
    });
  });

  function mobileMenuAccordionOpen(header, content) {
    header.classList.add('is-active');
    content.style.maxHeight = content.scrollHeight + 'px';
    setTimeout(() => {
      content.classList.add('is-active');
    }, 300);
  }

  function mobileMenuAccordionClose(header, content) {
    content.classList.remove('is-active');
    header.classList.remove('is-active');
    setTimeout(() => {
      content.style.maxHeight = '0';
    }, 0);
  }

  headerNavItemsMain.forEach((item) => {
    const header = item.querySelector('.header__nav-item-main');
    const content = item.querySelector('.header__nav-item-dropdown');

    if (!header && !content) return false;

    header.addEventListener('click', () => {
      if (window.innerWidth > 1024) {
        return;
      }

      if (!header.classList.contains('is-active')) {
        mobileMenuAccordionOpen(header, content);

        return;
      }

      mobileMenuAccordionClose(header, content);
    });
  });
})();

/* Main configurator */
(() => {
  // Dropdown Overlay - Global
  const dropdownOverlay = document.querySelector('.dropdown-overlay');

  window.showDropdownOverlay = () => {
    if (dropdownOverlay) {
      if (window.innerWidth <= 768) {
        window.hideScrollBar();
      }
      dropdownOverlay.classList.add('is-active');
    }
  };

  window.hideDropdownOverlay = () => {
    if (dropdownOverlay) {
      if (window.innerWidth <= 768) {
        window.showScrollBar();
      }

      dropdownOverlay.classList.remove('is-active');
    }
  };

  const mainConfiguratorMobile = document.querySelector(
    '.main-configurator-mobile',
  );

  let mainConfiguratorMobileShown = false;

  function showMainConfiguratorMobile() {
    mainConfiguratorMobile.classList.add('is-active');
    mainConfiguratorMobileShown = true;
  }

  function hideMainConfiguratorMobile() {
    mainConfiguratorMobile.classList.remove('is-active');
    mainConfiguratorMobileShown = false;
  }

  const closeAllTimepickerDropdowns = () => {
    const activeTimepickerDropdowns = document.querySelectorAll(
      '.main-configurator-timepicker__dropdown.is-active',
    );

    if (!activeTimepickerDropdowns.length) {
      return;
    }

    activeTimepickerDropdowns.forEach((item) => {
      item.classList.remove('is-active');
    });

    hideMainConfiguratorMobile();
    window.hideDropdownOverlay();
  };

  // Main configurator datepicker
  (() => {
    const mainConfiguratorDatepickerInputDateFrom = document.querySelector(
      '.main-configurator-datepicker__input--from',
    );
    const mainConfiguratorDatepickerInputDateTo = document.querySelector(
      '.main-configurator-datepicker__input--to',
    );
    const mainConfiguratorDatepickerInputFrom =
      document.querySelector('#dfrom');
    const mainConfiguratorDatepickerInputTo = document.querySelector('#dto');

    const mainConfiguratorDatepickerHeaderFrom = document.querySelector(
      '.main-configurator-datepicker__header--from',
    );
    const mainConfiguratorDatepickerHeaderTo = document.querySelector(
      '.main-configurator-datepicker__header--to',
    );

    const mainConfiguratorMobileFromValueDate = document.querySelector(
      '.main-configurator-mobile__from-value-date',
    );
    const mainConfiguratorMobileToValueDate = document.querySelector(
      '.main-configurator-mobile__to-value-date',
    );
    const mainConfiguratorMobileFromTitle = document.querySelector(
      '.main-configurator-mobile__main-item-title--from',
    );
    const mainConfiguratorMobileToTitle = document.querySelector(
      '.main-configurator-mobile__main-item-title--to',
    );

    const mainConfiguratorMobileButton = document.querySelector(
      '.main-configurator-mobile__button',
    );
    const mainConfiguratorMobileFromValueTime = document.querySelector(
      '.main-configurator-mobile__from-value-time',
    );
    const mainConfiguratorMobileToValueTime = document.querySelector(
      '.main-configurator-mobile__to-value-time',
    );

    const mainConfiguratorMobileFromValueTimeInput = document.querySelector(
      '.main-configurator-timepicker__input--from',
    );
    const mainConfiguratorMobileToValueTimeInput = document.querySelector(
      '.main-configurator-timepicker__input--to',
    );

    function checkButtonDisabled() {
      if ($('#dfrom').val() != '' && $('#dto').val() != '') {
        mainConfiguratorMobileButton.disabled = false;
      } else {
        mainConfiguratorMobileButton.disabled = true;
      }
    }

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function setDates(start, end) {
      const startLabel = start.format('DD MMM');
      const endLabel = end.format('DD MMM');

      mainConfiguratorDatepickerInputFrom.value = start.format('MMDDYYYY');
      mainConfiguratorDatepickerInputTo.value = end.format('MMDDYYYY');

      mainConfiguratorDatepickerInputDateFrom.value = startLabel;
      mainConfiguratorDatepickerInputDateTo.value = endLabel;
      mainConfiguratorMobileFromValueDate.textContent = startLabel;
      mainConfiguratorMobileToValueDate.textContent = endLabel;

      mainConfiguratorMobileToValueDate.classList.add('is-active');
      mainConfiguratorMobileToTitle.classList.add('is-active');
      mainConfiguratorDatepickerHeaderTo.classList.add('is-active');
      mainConfiguratorDatepickerInputDateTo.classList.remove('is-error');

      mainConfiguratorMobileFromValueDate.classList.add('is-active');
      mainConfiguratorMobileFromTitle.classList.add('is-active');
      mainConfiguratorDatepickerHeaderFrom.classList.add('is-active');
      mainConfiguratorDatepickerInputDateFrom.classList.remove('is-error');
    }

    function setStartDateOnly(start) {
      const startLabel = start.format('DD MMM');

      mainConfiguratorDatepickerInputFrom.value = start.format('MMDDYYYY');
      mainConfiguratorDatepickerInputDateFrom.value = startLabel;
      mainConfiguratorMobileFromValueDate.textContent = startLabel;
      mainConfiguratorMobileFromValueDate.classList.add('is-active');
      mainConfiguratorMobileFromTitle.classList.add('is-active');
      mainConfiguratorDatepickerHeaderFrom.classList.add('is-active');
      mainConfiguratorDatepickerInputDateFrom.classList.remove('is-error');

      mainConfiguratorDatepickerInputTo.value = '';
      mainConfiguratorDatepickerInputDateTo.value = '';
      mainConfiguratorMobileToValueDate.textContent = 'Date';
      mainConfiguratorMobileToValueDate.classList.remove('is-active');
      mainConfiguratorMobileToTitle.classList.remove('is-active');
      mainConfiguratorDatepickerHeaderTo.classList.remove('is-active');
      checkButtonDisabled();
    }

    $(mainConfiguratorDatepickerInputDateFrom).daterangepicker(
      {
        minDate: new Date(),
        autoApply: !isMobile(),
        autoUpdateInput: false,
        locale: {
          monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        },
      },
      function () {
        window.hideDropdownOverlay();
        hideMainConfiguratorMobile();
      },
    );

    const datepicker = $(mainConfiguratorDatepickerInputDateFrom).data(
      'daterangepicker',
    );

    let desktopSelectionMode = 'from';
    let desktopRangeInProgress = false;
    let desktopSelectionSnapshot = null;

    function rememberDesktopSelection() {
      desktopSelectionSnapshot = {
        from: mainConfiguratorDatepickerInputFrom.value,
        to: mainConfiguratorDatepickerInputTo.value,
        fromLabel: mainConfiguratorDatepickerInputDateFrom.value,
        toLabel: mainConfiguratorDatepickerInputDateTo.value,
      };
    }

    function restoreDesktopSelection() {
      if (!desktopSelectionSnapshot) return;

      mainConfiguratorDatepickerInputFrom.value = desktopSelectionSnapshot.from;
      mainConfiguratorDatepickerInputTo.value = desktopSelectionSnapshot.to;
      mainConfiguratorDatepickerInputDateFrom.value =
        desktopSelectionSnapshot.fromLabel;
      mainConfiguratorDatepickerInputDateTo.value =
        desktopSelectionSnapshot.toLabel;
      checkButtonDisabled();
    }

    // The range picker does not know which visible field opened it. On desktop
    // we intercept date selection so From is committed immediately and To can
    // be changed without resetting the existing start date.
    datepicker.container[0].addEventListener(
      'mousedown',
      (event) => {
        if (isMobile()) return;

        const dayCell = event.target.closest('td.available');
        if (!dayCell) return;

        event.preventDefault();
        event.stopPropagation();

        // Adjacent-month dates are duplicated in the other calendar. They are
        // hidden on desktop and must not move the highlight across columns.
        if (dayCell.classList.contains('off')) return;

        const coordinates = dayCell.dataset.title;
        const row = Number(coordinates.slice(1, 2));
        const column = Number(coordinates.slice(3, 4));
        const isLeftCalendar = Boolean(dayCell.closest('.drp-calendar.left'));
        const calendar = isLeftCalendar
          ? datepicker.leftCalendar.calendar
          : datepicker.rightCalendar.calendar;
        const clickedDate = calendar[row][column].clone();

        if (desktopSelectionMode === 'from') {
          const storedEnd = moment(
            mainConfiguratorDatepickerInputTo.value,
            'MMDDYYYY',
            true,
          );

          // When a complete range already exists, editing From should keep To.
          // If the new start would be after To, fall back to creating a new
          // range because the old end can no longer form a valid interval.
          if (storedEnd.isValid() && !clickedDate.isAfter(storedEnd, 'day')) {
            datepicker.setStartDate(clickedDate);
            datepicker.setEndDate(storedEnd);
            datepicker.updateView();
            desktopRangeInProgress = false;
            datepicker.clickApply();
            return;
          }

          datepicker.endDate = null;
          datepicker.setStartDate(clickedDate);
          datepicker.updateView();
          setStartDateOnly(clickedDate);
          desktopSelectionMode = 'to';
          desktopRangeInProgress = true;
          return;
        }

        const storedStart = moment(
          mainConfiguratorDatepickerInputFrom.value,
          'MMDDYYYY',
          true,
        );
        const startDate = storedStart.isValid()
          ? storedStart
          : datepicker.startDate.clone();

        if (clickedDate.isBefore(startDate, 'day')) return;

        datepicker.setStartDate(startDate);
        datepicker.setEndDate(clickedDate);
        datepicker.updateView();
        desktopRangeInProgress = false;
        datepicker.clickApply();
      },
      true,
    );

    $(mainConfiguratorDatepickerInputDateFrom).on(
      'show.daterangepicker',
      function (ev, picker) {
        if (!isMobile()) {
          rememberDesktopSelection();
          return;
        }

        $(picker.container).removeClass('is-closed').addClass('is-open');

        window.showDropdownOverlay();
        showMainConfiguratorMobile();
      },
    );

    $(mainConfiguratorDatepickerInputDateFrom).on(
      'hide.daterangepicker',
      function (ev, picker) {
        $(picker.container).removeClass('is-open').addClass('is-closed');

        if (isMobile()) {
          window.hideDropdownOverlay();
          hideMainConfiguratorMobile();
          closeAllTimepickerDropdowns();
        } else if (desktopRangeInProgress) {
          restoreDesktopSelection();
          desktopRangeInProgress = false;
          desktopSelectionMode = 'from';
        }
      },
    );

    $(mainConfiguratorDatepickerInputDateFrom).on(
      'setEndDate.daterangepicker',
      function (ev, picker) {
        setDates(picker.startDate, picker.endDate);

        checkButtonDisabled();
      },
    );

    function hideAllDatepickers() {
      datepicker.hide();
    }

    function showDatepicker(mode = 'from') {
      closeAllTimepickerDropdowns();
      desktopSelectionMode = mode;
      datepicker.show();
    }

    $(mainConfiguratorMobileButton).click(() => {
      datepicker.clickApply();

      hideAllDatepickers();
      hideMainConfiguratorMobile();
      closeAllTimepickerDropdowns();
      window.hideDropdownOverlay();
    });

    $(mainConfiguratorMobileFromValueTime).click(() => {
      hideAllDatepickers();
      showMainConfiguratorMobile();
      mainConfiguratorMobileFromValueTimeInput.click();
    });
    $(mainConfiguratorMobileToValueTime).click(() => {
      hideAllDatepickers();
      showMainConfiguratorMobile();
      mainConfiguratorMobileToValueTimeInput.click();
    });

    $(mainConfiguratorDatepickerInputDateFrom).click(function () {
      if (!isMobile()) desktopSelectionMode = 'from';
    });
    $(mainConfiguratorDatepickerInputDateTo).click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      const mode = mainConfiguratorDatepickerInputFrom.value ? 'to' : 'from';
      showDatepicker(mode);
    });
    $(mainConfiguratorMobileFromValueDate).click(function () {
      showDatepicker();
    });
    $(mainConfiguratorMobileToValueDate).click(function () {
      showDatepicker();
    });

    if (
      mainConfiguratorDatepickerInputFrom.value &&
      mainConfiguratorDatepickerInputTo.value
    ) {
      datepicker.setStartDate(mainConfiguratorDatepickerInputFrom.value);
      datepicker.setEndDate(mainConfiguratorDatepickerInputTo.value);
    }

    const mobilePIckerCLoseBtn = document.querySelector(
      '.ui-datepicker-group-close',
    );

    mobilePIckerCLoseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      datepicker.container.removeClass('is-open').addClass('is-closed');
      datepicker.hide();
      window.hideDropdownOverlay();
      hideMainConfiguratorMobile();
      closeAllTimepickerDropdowns();
    });
  })();

  // Close all dropdowns when clicking on overlay
  if (dropdownOverlay) {
    dropdownOverlay.addEventListener('click', () => {
      // Close main configurator dropdown
      const mainConfiguratorDropdownContent = document.querySelector(
        '.main-configurator-dropdown__content.is-active',
      );
      if (mainConfiguratorDropdownContent) {
        mainConfiguratorDropdownContent.classList.remove('is-active');
        document
          .querySelector('.main-configurator-dropdown__header-value')
          ?.classList.remove('is-hidden');
        document
          .querySelector('.main-configurator-dropdown__header-input')
          ?.classList.remove('is-active');
        document
          .querySelector('.main-configurator-dropdown__header-icon')
          ?.classList.remove('is-active');
      }

      // Close datepicker
      $('.main-configurator-datepicker__input.is-date')
        .data('daterangepicker')
        .hide();

      // Hide overlay
      window.hideDropdownOverlay();
      hideMainConfiguratorMobile();
      closeAllTimepickerDropdowns();
    });
  }

  /* Promocode Input */
  (() => {
    const promocodeInputs = document.querySelectorAll('.promocode-input');
    const promocodeInputHeaderLink = document.querySelectorAll(
      '.promocode-input__header-link',
    );
    const promocodeInputHeader = document.querySelector(
      '.promocode-input__header',
    );
    const promocodeInputContainer = document.querySelector(
      '.promocode-input__container',
    );

    if (promocodeInputHeaderLink?.length) {
      promocodeInputHeaderLink.forEach((link) => {
        link.addEventListener('click', () => {
          promocodeInputContainer.classList.toggle('is-active');
          promocodeInputHeader.classList.toggle('is-hidden');
        });
      });
    }

    promocodeInputs.forEach((container) => {
      const input = container.querySelector('.promocode-input__input');
      const applyBtn = container.querySelector('.promocode-input__btn');
      const clearBtn = container.querySelector('.promocode-input__clear');

      if (!input) return;

      // Update state based on input value
      function updateState() {
        const value = input.value.trim();

        // Reset states
        container.classList.remove('is-typing', 'is-filled', 'is-error');

        if (value.length > 0) {
          container.classList.add('is-typing');
        }
      }

      // Input event
      input.addEventListener('input', updateState);

      // Focus event
      input.addEventListener('focus', () => {
        if (input.value.trim().length > 0) {
          container.classList.add('is-typing');
        }
      });

      // Apply button click
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          const value = input.value.trim();

          if (!value) return;

          // Simulate validation (replace with actual logic)
          // For demo: codes starting with "err" show error state
          if (value.toLowerCase().startsWith('err')) {
            container.classList.remove('is-typing');
            container.classList.add('is-error');
          } else {
            container.classList.remove('is-typing', 'is-error');
            container.classList.add('is-filled');
          }
        });
      }

      // Clear button click
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          container.classList.remove('is-typing', 'is-filled', 'is-error');
          input.focus();
        });
      }
    });
  })();

  // Main configurator dropdown
  (() => {
    const mainConfiguratorDropdown = document.querySelector(
      '.main-configurator-dropdown',
    );
    const mainConfiguratorDropdownHeader = document.querySelector(
      '.main-configurator-dropdown__header',
    );
    const mainConfiguratorDropdownContent = document.querySelector(
      '.main-configurator-dropdown__content',
    );
    const mainConfiguratorDropdownHeaderTitle = document.querySelector(
      '.main-configurator-dropdown__header-title',
    );
    const mainConfiguratorDropdownHeaderTitleText = document.querySelector(
      '.main-configurator-dropdown__header-title-text',
    );
    const mainConfiguratorDropdownHeaderTitleInput = document.querySelector(
      '.main-configurator-dropdown__header-title-input',
    );
    const mainConfiguratorDropdownHeaderValue = document.querySelector(
      '.main-configurator-dropdown__header-value',
    );
    const mainConfiguratorDropdownHeaderInput = document.querySelectorAll(
      '.main-configurator-dropdown__header-input',
    );
    const mainConfiguratorDropdownHeaderIcon = document.querySelector(
      '.main-configurator-dropdown__header-icon',
    );
    const mainConfiguratorDropdownOptions = document.querySelectorAll(
      '.main-configurator-dropdown-option',
    );
    const mainConfiguratorDropdownOptionsBoxes = document.querySelectorAll(
      '.main-configurator-dropdown__options-box',
    );
    const mainConfiguratorDropdownSearchClose = document.querySelector(
      '.main-configurator-dropdown__conten-search-close',
    );

    if (!mainConfiguratorDropdown || !mainConfiguratorDropdownHeader) return;

    function closeDropdown() {
      if (!mainConfiguratorDropdownContent.classList.contains('is-active')) {
        return;
      }

      mainConfiguratorDropdownContent.classList.remove('is-active');
      mainConfiguratorDropdownHeaderValue.classList.remove('is-hidden');
      mainConfiguratorDropdownHeaderInput[0].classList.remove('is-active');
      mainConfiguratorDropdownHeaderIcon.classList.remove('is-active');
      mainConfiguratorDropdownHeaderInput[0].blur();
      mainConfiguratorDropdownHeaderInput[0].value = '';
      resetFilter();
      window.hideDropdownOverlay();
    }

    function openDropdown() {
      mainConfiguratorDropdownContent.classList.add('is-active');
      mainConfiguratorDropdownHeaderValue.classList.add('is-hidden');
      mainConfiguratorDropdownHeaderInput[0].classList.add('is-active');
      mainConfiguratorDropdownHeaderIcon.classList.add('is-active');
      mainConfiguratorDropdownHeaderInput[0].focus();
      window.showDropdownOverlay();
    }

    // Filter options based on search query
    function filterOptions(query) {
      const searchQuery = query.toLowerCase().trim();

      mainConfiguratorDropdownOptions.forEach((option) => {
        const optionText = option.textContent.toLowerCase();

        if (searchQuery === '' || optionText.includes(searchQuery)) {
          option.classList.remove('is-hidden');
        } else {
          option.classList.add('is-hidden');
        }
      });

      // Check each options-box for visible options
      mainConfiguratorDropdownOptionsBoxes.forEach((box) => {
        const visibleOptions = box.querySelectorAll(
          '.main-configurator-dropdown-option:not(.is-hidden)',
        );

        if (visibleOptions.length === 0) {
          box.classList.add('is-hidden');
        } else {
          box.classList.remove('is-hidden');
        }
      });
    }

    // Reset filter - show all options
    function resetFilter() {
      mainConfiguratorDropdownOptions.forEach((option) => {
        option.classList.remove('is-hidden');
      });

      mainConfiguratorDropdownOptionsBoxes.forEach((box) => {
        box.classList.remove('is-hidden');
      });
    }

    // Select option
    function selectOption(option) {
      const valueShort = option.dataset.valueShort;
      const valueLong = option.dataset.valueLong;

      // Set short value to header value
      mainConfiguratorDropdownHeaderValue.textContent = valueShort;

      // Set long value to title input and text
      mainConfiguratorDropdownHeaderTitleInput.value = valueShort;
      mainConfiguratorDropdownHeaderTitleText.textContent = valueLong;

      // Update search placeholder with long value
      const mainConfiguratorDropdownSearchPlaceholder = document.querySelector(
        '.main-configurator-dropdown__conten-search-placeholder',
      );
      if (mainConfiguratorDropdownSearchPlaceholder) {
        mainConfiguratorDropdownSearchPlaceholder.textContent = valueLong;
      }

      // Sync parking type items
      const parkingTypeItems = document.querySelectorAll(
        '.parking-type-list__item',
      );
      parkingTypeItems.forEach((item) => {
        if (item.dataset.valueShort === valueShort) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });

      // Add selected class to title
      mainConfiguratorDropdownHeaderTitle.classList.add('is-active');

      // Close dropdown
      closeDropdown();
    }

    // Header click handler
    mainConfiguratorDropdownHeader.addEventListener('click', (e) => {
      e.stopPropagation();

      if (mainConfiguratorDropdownContent.classList.contains('is-active')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Input filter handler
    mainConfiguratorDropdownHeaderInput.forEach((input) => {
      input.addEventListener('input', (e) => {
        filterOptions(e.target.value);
      });
    });

    // Option click handlers
    mainConfiguratorDropdownOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        selectOption(option);
      });
    });

    // Click outside handler
    document.addEventListener('click', (e) => {
      if (!mainConfiguratorDropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    // Prevent closing when clicking inside dropdown content (except options)
    mainConfiguratorDropdownContent.addEventListener('click', (e) => {
      if (!e.target.classList.contains('main-configurator-dropdown-option')) {
        e.stopPropagation();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    // Close button click handler
    if (mainConfiguratorDropdownSearchClose) {
      mainConfiguratorDropdownSearchClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDropdown();
      });
    }

    // Parking type change handler
    const parkingTypeItems = document.querySelectorAll(
      '.parking-type-list__item',
    );

    const mainConfiguratorDropdownSearchPlaceholder = document.querySelector(
      '.main-configurator-dropdown__conten-search-placeholder',
    );

    // Function to sync all parking type states
    function syncParkingTypeState(valueShort, valueLong) {
      // Update header value with short value
      mainConfiguratorDropdownHeaderValue.textContent = valueShort;

      // Update title text and input with long value
      mainConfiguratorDropdownHeaderTitleText.textContent = valueLong;
      mainConfiguratorDropdownHeaderTitleInput.value = valueShort;

      // Update search placeholder with long value
      if (mainConfiguratorDropdownSearchPlaceholder) {
        mainConfiguratorDropdownSearchPlaceholder.textContent = valueLong;
      }

      // Add active class to title
      mainConfiguratorDropdownHeaderTitle.classList.add('is-active');

      // Update all parking type items (desktop and mobile)
      parkingTypeItems.forEach((item) => {
        if (item.dataset.valueShort === valueShort) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    }

    // Parking type item click handler (both desktop and mobile)
    parkingTypeItems.forEach((item) => {
      item.addEventListener('click', () => {
        const valueShort = item.dataset.valueShort;
        const valueLong = item.dataset.valueLong;
        syncParkingTypeState(valueShort, valueLong);
      });
    });

    /* Set initial value from query params */
    (() => {
      const queryParams = new URLSearchParams(window.location.search);
      const airport = queryParams.get('airport');

      if (airport) {
        const airportOption = document.querySelector(
          `.main-configurator-dropdown-option[data-value-short="${airport}"]`,
        );

        if (airportOption) {
          selectOption(airportOption);
        }
      }
    })();
  })();

  // Main configurator timepicker
  (() => {
    const timepickers = document.querySelectorAll(
      '.main-configurator-timepicker',
    );

    if (!timepickers.length) return;

    timepickers.forEach((timepicker) => {
      const input = timepicker.querySelector(
        '.main-configurator-timepicker__input',
      );
      const dropdown = timepicker.querySelector(
        '.main-configurator-timepicker__dropdown',
      );
      const options = timepicker.querySelectorAll(
        '.main-configurator-timepicker__option',
      );
      const mainConfiguratorMobileFromValueTime = document.querySelector(
        '.main-configurator-mobile__from-value-time',
      );
      const mainConfiguratorMobileToValueTime = document.querySelector(
        '.main-configurator-mobile__to-value-time',
      );
      const mainConfiguratorTimeInputReal = timepicker.querySelector(
        '.main-configurator-timepicker__input-real',
      );

      if (!input || !dropdown) return;

      // Toggle dropdown on input click
      input.addEventListener('click', (e) => {
        e.stopPropagation();

        // Close other timepicker dropdowns
        document
          .querySelectorAll('.main-configurator-timepicker__dropdown.is-active')
          .forEach((d) => {
            if (d !== dropdown) {
              d.classList.remove('is-active');
            }
          });
        const isOpening = !dropdown.classList.contains('is-active');
        dropdown.classList.toggle('is-active');

        if (isOpening) {
          window.showDropdownOverlay();
        } else {
          window.hideDropdownOverlay();
        }
      });

      // Option click handler
      options.forEach((option) => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();

          const value = option.dataset.value;
          const valueReal = option.dataset.valueReal;
          // Update input value
          input.value = value;
          mainConfiguratorTimeInputReal.value = valueReal;

          if (input.name === 'from_time') {
            mainConfiguratorMobileFromValueTime.textContent = value;
            mainConfiguratorMobileFromValueTime.classList.add('is-active');
          } else {
            mainConfiguratorMobileToValueTime.textContent = value;
            mainConfiguratorMobileToValueTime.classList.add('is-active');
          }

          // Update selected state
          options.forEach((opt) => opt.classList.remove('is-selected'));
          option.classList.add('is-selected');

          // Close dropdown
          dropdown.classList.remove('is-active');
          window.hideDropdownOverlay();
          hideMainConfiguratorMobile();
        });
      });
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (
        !e.target.closest('.main-configurator-timepicker') &&
        !e.target.closest('.main-configurator-mobile')
      ) {
        closeAllTimepickerDropdowns();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllTimepickerDropdowns();
      }
    });
  })();

  // Main configurator form validation
  (() => {
    const mainConfiguratorForm = document.querySelector('.main-configurator');

    if (!mainConfiguratorForm) return;

    // Elements to validate
    const airportInput = document.querySelector(
      '.main-configurator-dropdown__header-title-input',
    );
    const airportDropdown = document.querySelector(
      '.main-configurator-dropdown',
    );

    const fromDateInput = document.querySelector('#dfrom');
    const fromDateVisible = document.querySelector(
      '.main-configurator-datepicker__input--from',
    );
    const toDateInput = document.querySelector('#dto');
    const toDateVisible = document.querySelector(
      '.main-configurator-datepicker__input--to',
    );
    const fromTimeInput = document.querySelector(
      '.main-configurator-timepicker__input--from',
    );
    const toTimeInput = document.querySelector(
      '.main-configurator-timepicker__input--to',
    );

    // Validation function
    function validateForm() {
      let isValid = true;

      // Validate airport
      if (!airportInput || !airportInput.value.trim()) {
        airportDropdown?.classList.add('is-error');
        isValid = false;
      }

      // Validate from date
      if (!fromDateInput || !fromDateInput.value.trim()) {
        fromDateVisible?.classList.add('is-error');
        isValid = false;
      }

      // Validate to date
      if (!toDateInput || !toDateInput.value.trim()) {
        toDateVisible?.classList.add('is-error');
        isValid = false;
      }

      // Validate from time
      if (!fromTimeInput || !fromTimeInput.value.trim()) {
        fromTimeInput?.classList.add('is-error');
        isValid = false;
      }

      // Validate to time
      if (!toTimeInput || !toTimeInput.value.trim()) {
        toTimeInput?.classList.add('is-error');
        isValid = false;
      }

      return isValid;
    }

    // Remove error class on change
    function setupErrorRemoval() {
      // Airport dropdown - remove error when option selected
      const airportOptions = document.querySelectorAll(
        '.main-configurator-dropdown-option',
      );
      const parkingTypeItems = document.querySelectorAll(
        '.parking-type-list__item',
      );

      airportOptions.forEach((option) => {
        option.addEventListener('click', () => {
          airportDropdown?.classList.remove('is-error');
        });
      });

      parkingTypeItems.forEach((item) => {
        item.addEventListener('click', () => {
          airportDropdown?.classList.remove('is-error');
        });
      });

      // Time inputs - remove error when time selected
      const fromTimeOptions = fromTimeInput
        ?.closest('.main-configurator-timepicker')
        ?.querySelectorAll('.main-configurator-timepicker__option');

      const toTimeOptions = toTimeInput
        ?.closest('.main-configurator-timepicker')
        ?.querySelectorAll('.main-configurator-timepicker__option');

      fromTimeOptions?.forEach((option) => {
        option.addEventListener('click', () => {
          fromTimeInput?.classList.remove('is-error');
        });
      });

      toTimeOptions?.forEach((option) => {
        option.addEventListener('click', () => {
          toTimeInput?.classList.remove('is-error');
        });
      });
    }

    // Form submit handler
    mainConfiguratorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      // TODO: Change to the actual URL
      const TARGETURL = '/parking/find.php';

      const newFormData = new FormData();
      const formData = new FormData(mainConfiguratorForm);
      const formDataObject = Object.fromEntries(formData);
      console.log(formDataObject);

      const airport = formDataObject.airport;
      const from = `${formDataObject.from_date}-${formDataObject.from_time_real}`;
      const to = `${formDataObject.to_date}-${formDataObject.to_time_real}`;

      newFormData.append('airport', airport);
      newFormData.append('from', from);
      newFormData.append('to', to);

      const formDataString = new URLSearchParams(newFormData).toString();

      const url = `${TARGETURL}?${formDataString}`;

      window.location.href = url;
    });

    // Initialize error removal listeners
    setupErrorRemoval();
  })();
})();
