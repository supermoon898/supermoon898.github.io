import React, { Component } from 'react';

import { connect } from 'react-redux';

import { green800, green900, cyan500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';

import { fetchSiteInfo } from '../actions/index';
import Menu from './menu';

import { getLink } from '../helpers';

class Header extends Component {


  constructor(props) {
    super(props);
    this.state = { open: false, config: {}, width: 1200, height: null };
  }

  componentWillMount() {
    this.props.fetchSiteInfo();
  }

  getLogo() {
    if (!this.props.config.logo) {
        return;
    }
    return (
      <img role="presentation" src={`${this.props.config.url}/${this.props.config.logo}`} />
    );
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  styles = {
    toggle: {
      marginBottom: 10,
    },
    thumbSwitched: {
      backgroundColor: green900,
    },
    trackSwitched: {
      backgroundColor: green800,
    },
    trackOff: {
      backgroundColor: cyan500,
    }
  }

  render() {
    return (
      <div id="wrapper">
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <div>
              {getLink(this.getLogo(), '', this.props.config.url, '/')}
              <Toggle
                label="Toggle Dark Theme"
                labelPosition="right"
                defaultToggled
                style={this.styles.toggle}
                thumbSwitchedStyle={this.styles.thumbSwitched}
                trackSwitchedStyle={this.styles.trackSwitched}
                trackStyle={this.styles.trackOff}
              />
            </div>
          }
        />
        <Menu handleToggle={this.handleToggle} open={this.state.open} config={this.props.config} />
        {this.props.children}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { config: state.siteInfo.all };
}

export default connect(mapStateToProps, { fetchSiteInfo })(Header);