// @flow
import React, {PureComponent} from 'react';
import autobind from 'autobind-decorator';
import {Cookie} from 'tough-cookie';

import {cookieToString} from '../../common/cookies';
import PromptButton from './base/prompt-button';
import RenderedText from './rendered-text';

@autobind
class CookieList extends PureComponent {
  props: {
    onCookieAdd: Function,
    onCookieDelete: Function,
    cookies: Array<Cookie>,
    newCookieDomainName: string,
    handleShowModifyCookieModal: Function,
    handleRender: Function
  };

  _handleCookieAdd () {
    const newCookie = new Cookie({
      key: 'foo',
      value: 'bar',
      domain: this.props.newCookieDomainName,
      path: '/',
      secure: false,
      httpOnly: false
    });

    this.props.onCookieAdd(newCookie);
  }

  _handleDeleteCookie (cookie: Cookie) {
    this.props.onCookieDelete(cookie);
  }

  render () {
    const {
      cookies,
      handleShowModifyCookieModal,
      handleRender
    } = this.props;

    return (
      <div>
        <table className="table--fancy cookie-table table--striped">
          <thead>
          <tr>
            <th style={{minWidth: '10rem'}}>Domain</th>
            <th style={{width: '90%'}}>Cookie</th>
            <th style={{width: '2rem'}} className="text-right">
              <button className="btn btn--super-duper-compact btn--outlined txt-md"
                      onClick={this._handleCookieAdd}
                      title="Add cookie">
                Add Cookie
              </button>
            </th>
          </tr>
          </thead>
          <tbody key={cookies.length}>
          {cookies.map((cookie, i) => {
            const cookieString = cookieToString(Cookie.fromJSON(JSON.stringify(cookie)));

            return (
              <tr className="selectable" key={i}>
                <RenderedText render={handleRender} component="td">
                  {cookie.domain}
                </RenderedText>
                <RenderedText render={handleRender} component="td"
                              props={{className: 'force-wrap wide'}}>
                  {cookieString}
                </RenderedText>
                <td onClick={null} className="text-right no-wrap">
                  <button className="btn btn--super-compact btn--outlined"
                          onClick={e => handleShowModifyCookieModal(cookie)}
                          title="Edit cookie properties">
                    Edit
                  </button>
                  {' '}
                  <PromptButton className="btn btn--super-compact btn--outlined"
                                addIcon
                                confirmMessage=" "
                                onClick={e => this._handleDeleteCookie(cookie)}
                                title="Delete cookie">
                    <i className="fa fa-trash-o"/>
                  </PromptButton>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        {cookies.length === 0 && (
          <div className="pad faint italic text-center">
            <p>
              I couldn't find any cookies for you.
            </p>
            <p>
              <button className="btn btn--clicky" onClick={e => this._handleCookieAdd()}>
                Add Cookie <i className="fa fa-plus-circle"/>
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default CookieList;
