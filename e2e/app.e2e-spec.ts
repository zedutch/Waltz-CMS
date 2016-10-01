import { Waltz2Page } from './app.po';

describe('waltz-2 App', function() {
  let page: Waltz2Page;

  beforeEach(() => {
    page = new Waltz2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
