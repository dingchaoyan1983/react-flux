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
      showDropdown: false,
      selectedIndex: -1
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
      if(this.state.selectedIndex > -1 && !this.state.value) {
        this.addTagToList(this.state.allTagList[this.state.selectedIndex].name);
      } else {
        this.addTagToList(this.state.value);
      }
    } else if (keyCode === 8 && !this.state.value.trim()) { //BACKSPACE
      let lastIndex = this.state.shownTagList.length - 1;
      this.removeTagHandler(lastIndex);
      this.setState({
        value: ''
      });
    } else if (keyCode === 38) { //UP
      let currentIndex = this.state.selectedIndex;
      let totalLength = this.state.allTagList.length;

      if(currentIndex !== -1) {
        currentIndex -= 1;
      }

      currentIndex = totalLength + currentIndex;
      this.setState({
        selectedIndex: currentIndex % totalLength
      });
    } else if (keyCode === 40) { //DOWN
      let currentIndex = this.state.selectedIndex;
      let totalLength = this.state.allTagList.length;

      currentIndex += 1;
      currentIndex = Math.abs(currentIndex);

      this.setState({
        selectedIndex: currentIndex % totalLength
      });
    }
  },

  addTagToList(tag) {
    let shownTagList = this.state.shownTagList;
    let tagList = shownTagList.map(function(item) {
      return item.name
    });

    if (!!tag && tagList.indexOf(tag) === -1) {
      this.state.shownTagList.push({name: tag});
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
        showDropdown: false,
        value: ''
      });
    }.bind(this), 100);
  },

  handleFocus() {
    this.setState({
      showDropdown: true,
      selectedIndex: -1
    });
  },

  dropdownItemClickHandler(index) {
    let selectedItem = this.state.allTagList[index];
    this.addTagToList(selectedItem.name);
  },

  appendDropdown() {
    if (this.state.showDropdown && this.state.allTagList.length > 0) {
      return <ul className="tag-manager__dropdown" ref="dropdown">
              {
                this.state.allTagList.map(function(item, index) {
                  return <li className={this.state.selectedIndex === index ? "tag-manager__dropdown-item highlight": "tag-manager__dropdown-item"} onClick={this.dropdownItemClickHandler.bind(this, index)}>{item.name}</li>
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
