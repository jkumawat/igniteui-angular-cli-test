import { IgniteuiAngularCliTestPage } from './app.po';

describe('igniteui-angular-cli-test App', function() {
  let page: IgniteuiAngularCliTestPage;

  beforeEach(() => {
    page = new IgniteuiAngularCliTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
