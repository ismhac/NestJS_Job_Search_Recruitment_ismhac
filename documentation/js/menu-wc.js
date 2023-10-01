'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic-ismhac documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' :
                                            'id="xs-controllers-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' :
                                        'id="xs-injectables-links-module-AppModule-5d2a09870075eecd740258d846887fcfc60d344054dc45f729f406cb9e6e6ab6ee1a9dbf4e520a90b5a207b97e15446c7d3150d40c23a249d9a12ead67a4c0e9"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' :
                                            'id="xs-controllers-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' :
                                        'id="xs-injectables-links-module-AuthModule-b61e38d6066c5cccf9cf99aa4bd552844c32b0ac07055b2561d5e3afe99400da5d4feac7e2a42cfc00cb313e2eba40f523d464a27d44269de77a14374de406cf"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' :
                                            'id="xs-controllers-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' :
                                        'id="xs-injectables-links-module-CompaniesModule-60af3f467d73a351550fd7c52fcd50d05bed6948c947d8b5f0b05d7e1fbe3f87d6a4b748f6c1a05343e27583f2ca80442654db6da8a2f897e67a2fa489bf812c"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' :
                                            'id="xs-controllers-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' :
                                        'id="xs-injectables-links-module-DatabasesModule-c74d1558d79ca2d865db04152c16b60c427932dcdd646737d8c43d71d2bb85d274c64abe1c7252460fff293af68215d9d681a53412ac201eb0bda5eca9513527"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' :
                                            'id="xs-controllers-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' :
                                        'id="xs-injectables-links-module-FilesModule-e78c6f58832babd62fe056f000d9b3fdc832126d3672e08f5510905207e5751bd0bd1767a060f93effc2e477b81f43bd8a3aed354060d4aeb1923b53258ccbc2"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' :
                                            'id="xs-controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' :
                                        'id="xs-injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' :
                                            'id="xs-controllers-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' :
                                        'id="xs-injectables-links-module-PermissionsModule-f0be16b782165a1fe38bdb2e843461603fac718371d0a211282f3c8cffb86778fd4a9c7f730e59daba6306cd888887e4711d8cc07bafe41ddc89ace6d279a4f3"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' :
                                            'id="xs-controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' :
                                        'id="xs-injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' :
                                            'id="xs-controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' :
                                        'id="xs-injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' :
                                            'id="xs-controllers-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' :
                                        'id="xs-injectables-links-module-UsersModule-f2ed63e3dfde874d79d2bfca6736b5b7f3023460e3b76c0f530c5ba68bfee5c85ba6b079b2f31577d473eeccb95dc00d3b4b7d5a6ddbb614206bc50e522a0d66"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});