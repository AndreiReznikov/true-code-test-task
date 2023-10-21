import mars from '~videos/mars.mp4';
import AirDatepicker from '~libs/air-datepicker';

class LandingPage {
  init() {
    this._findElements();
    this._setVideo();
    this._startInitialAnimation();
    this._initializeDateDropdown();
    this._addEventListeners();
  }

  _findElements() {
    this.$window = $(window);
    this.$landingPageBackground = $('.landing-page__background');
    this.$landingPageTitle = $('.landing-page__title');
    this.$landingPageScrim = $('.landing-page__scrim');
    this.$video = $('video');
  }

  _startInitialAnimation() {
    setTimeout(() => this._setBackgroundPosition('center'));
    setTimeout(() => {
      this.$landingPageBackground.css({
        color: 'rgba(0, 0, 0, 1)',
        'mix-blend-mode': 'lighten',
      });
      this.$landingPageScrim.css({
        color: 'rgba(0, 0, 0, 1)',
      });
      this.$landingPageTitle.css({
        color: '#fff',
      });
      this.$landingPageBackground.text('Марс');
      this.$landingPageScrim.text('Марс');
    }, 1200);
  }

  _setBackgroundPosition(position) {
    this.$landingPageBackground.css({ 'background-position': position });
  }

  _shiftBackground(event) {
    this.$landingPageBackground.css({ transition: '0.6s' });

    this.$windowWidth = this.$window.width();
    this.clientX = event.pageX;
    let position = 'center';

    if (this.clientX < this.$windowWidth * 0.33) position = 'left';
    else if (this.clientX > this.$windowWidth * 0.66) position = 'right';

    this._setBackgroundPosition(position);
  }

  _setVideo() {
    this.$video.attr('src', mars);
  }

  _initializeDateDropdown() {
    this.dateDropdown = new AirDatepicker('.js-date-dropdown');

    this.dateDropdown.initializePlugin({
      clearButton: true,
      keyboardNav: true,
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: '<div class="datepicker--arrow-prev"></div>',
      nextHtml: '<div class="datepicker--arrow-next"></div>',
    });

    this.dateDropdown.setDatesDefault();
    this.dateDropdown.openDatepickerMultiple();
    this.dateDropdown.addApplyButton();
    this.dateDropdown.checkEmptyValue();
  }

  _addEventListeners() {
    this.$landingPageBackground.on('mousemove', (event) => this._shiftBackground.call(this, event));
    this.$landingPageBackground.on('mouseleave', () => this._setBackgroundPosition('center'));
  }
}

export default LandingPage;
