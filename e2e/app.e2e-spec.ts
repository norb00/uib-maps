import { UbMapsPage } from './app.po';

describe('ub-maps App', () => {
  let page: UbMapsPage;

  beforeEach(() => {
    page = new UbMapsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
