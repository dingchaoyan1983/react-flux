/**
 * Created by daneding on 7/14/15.
 */

import React from 'react';
require('../../css/tag-input.css');

export default React.createClass({
  getDefaultProps() {
    return {
      allTagList: [],
      shownTagList: []
    }
  },

  getInitialState() {
    return {
      allTagList: this.props.allTagList,
      shownTagList: this.props.shownTagList,
      value: '',
      showDropdown: false
    };
  },

  showExistTags() {
   return this.state.shownTagList.map(function(item, index){
      return <li className="tag-manager__tag" onClick={this.removeTagHandler.bind(this, index)}>{item.name}<span className="icon-close">X</span></li>
    }, this);
  },

  removeTagHandler: function(index) {
    var shownTagList = this.state.shownTagList;
    shownTagList.splice(index,1);
    this.setState({
      shownTagList: shownTagList
    });
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  handleKeyUp(event) {
    let keyCode = event.keyCode;

    if(keyCode ===13) { //ENTER
      this.addTagToList();
    } else if (keyCode === 8 && !this.state.value.trim()) { //BACKSPACE
      let lastIndex = this.state.shownTagList.length - 1;
      this.removeTagHandler(lastIndex);
      this.setState({
        value: ''
      });
    } else if (keyCode === 38) { //UP

    } else if (keyCode === 40) { //DOWN

    }
  },

  addTagToList() {
    let value = this.state.value.trim();
    let shownTagList = this.state.shownTagList;
    let tagList = shownTagList.map(function(item) {
      return item.name
    });

    if (!!value && tagList.indexOf(value) === -1) {
      this.state.shownTagList.push({name: value});
      this.setState({
        shownTagList: this.state.shownTagList
      });
    }

    this.setState({
        value: ''
    });
  },

  handleBlur() {
    window.setTimeout(function(){
      this.setState({
        showDropdown: false
      });
    }.bind(this), 100);

    this.addTagToList();
  },

  handleFocus() {
    this.setState({
      showDropdown: true
    });
  },

  dropdownItemClickHandler(index) {
    let selectedItem = this.state.allTagList[index];
    this.state.shownTagList.push({name: selectedItem.name});

    this.setState({
      shownTagList: this.state.shownTagList
    });

  },

  appendDropdown() {
    if (this.state.showDropdown && this.state.allTagList.length > 0) {
      return <ul className="tag-manager__dropdown">
              {
                this.state.allTagList.map(function(item, index) {
                  return <li className="tag-manager__dropdown-item" onClick={this.dropdownItemClickHandler.bind(this, index)}>{item.name}</li>
                }, this)
              }
            </ul>;
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
              <input className="tag-manager__input" onKeyUp ={this.handleKeyUp} onBlur={this.handleBlur} onFocus={this.handleFocus} value={this.state.value} onChange={this.handleChange} placeholder="Tag your message with information about your post" type="text"/>
              {this.appendDropdown()}
            </span>
          </div>;
  }
});
