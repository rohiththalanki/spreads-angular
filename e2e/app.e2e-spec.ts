import { RohitinternPage } from './app.po';

describe('rohitintern App', () => {
  let page: RohitinternPage;

  beforeEach(() => {
    page = new RohitinternPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
