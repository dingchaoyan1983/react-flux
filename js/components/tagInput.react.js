/**
 * Created by daneding on 7/14/15.
 */

import React from 'react';

export default React.createClass({

  getInitialState() {
    return {
      tagList: [],
      shownTagList: [],
      value: '',
      showDropdown: false
    }
  },

  showExistTags() {
   return this.state.shownTagList.map(function(item){
      return <li className="tag-manager__tag">{item.name}<span className="icon-close">X</span></li>
    }, this);
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  handleKeyUp(event) {
      console.log(event.keyCode);
      if(event.keyCode ===13) {
        this.addTagToList();
      }
  },

  addTagToList() {
    this.state.shownTagList.push({name: this.state.value});
    this.setState({
      shownTagList: this.state.shownTagList,
      value: ''
    })
  },

  handleBlur() {
    this.setState({
      showDropdown: false
    });

    if(this.state.value === ''){
      return;
    } else {
      this.addTagToList();
    }
  },

  handleFocus() {
    this.setState({
      showDropdown: true
    })
  },

  appendDropdown() {
    if (this.state.showDropdown) {
      return <ul className="tag-manager__dropdown">
                <li className="tag-manager__dropdown-item">4353453453</li>
                <li className="tag-manager__dropdown-item">4353453453</li>
                <li className="tag-manager__dropdown-item">4353453453</li>
                <li className="tag-manager__dropdown-item">4353453453</li>
            </ul>
    } else {
      return null;
    }
  },

  render() {
    return <div className="tag-manager">
            <ul className="tag-manager__tag-list">
              {this.showExistTags()}
            </ul>
            <span className="tag-manager__input-wrapper" style={{width: '350px'}}>
              <input className="tag-manager__input" onKeyUp={this.handleKeyUp} onBlur={this.handleBlur} onFocus={this.handleFocus} value={this.state.value} onChange={this.handleChange} placeholder="Tag your message with information about your post" type="text"/>
            {this.appendDropdown()}
            </span>
          </div>
  }

});