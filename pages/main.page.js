const { expect } = require('@playwright/test');
const baseUrl = require('../helpers/help.data').baseUrl;
const existingUser = require('../helpers/help.data').existingUser;


exports.MainPage = class MainPage {
    
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        //page url
        this.url = baseUrl

        //locators
        this.loginLink = page.locator('.login');
        this.reigsterLink = page.locator('#account .register');
        this.myPageLink = page.locator('[href="/my/page"]');
        this.profileLink = page.locator('#loggedas .user');

        this.searchInput = page.locator('#q')
        
        this.issuesTab = page.locator('#main-menu .issues');

        this.documentationNavigationLink = page.locator('.toc [href="#Documentation"]');
        
        this.userGuideWikiLink = page.locator('//h2/a[@href="#Documentation"]/../following-sibling::ul//*[contains(@href,"/Guide")]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async fillSearchField (word) {
        await this.searchInput.fill(word);
    }

    async pressEnter (inputField) {
        await inputField.press('Enter');
    }

    async documentationNaviLinkClick () {
        await this.documentationNavigationLink.click();
    }

    async userGuideDocumentationLinkClick () {
        await this.userGuideWikiLink.click();
    }

    async registerClick () {
        await this.reigsterLink.hover();
        await this.reigsterLink.click();
    }

    async signInClick() {
        await this.loginLink.hover();
        await this.loginLink.click();
    }

    async issuesTabClick() {
        await this.issuesTab.hover();
        await this.issuesTab.click();
    }

    async userIsLogged() {
        
        if (await this.myPageLink.isVisible() && await this.profileLink.isVisible()) {
            await expect(this.profileLink).toHaveText(existingUser.login);
        }
        else {
            await this.page.screenshot({ path: './screenshots/"My_page"_or(and)_profile_link(s)_is_not_visible_after_user_login.png', fullPage: true });
            await expect(this.myPageLink, '"My page" link is not displayed').toBeVisible();
            await expect(this.profileLink, "Profile link is not displayed").toBeVisible();
        }
    }
}