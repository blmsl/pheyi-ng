import { PheyiNgPage } from './app.po';

describe('pheyi-ng App', () => {
  let page: PheyiNgPage;

  beforeEach(() => {
    page = new PheyiNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
