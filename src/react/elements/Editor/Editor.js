/* eslint-disable react/no-array-index-key */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { isValidString } from '@appbuckets/rabbit';

import _ from 'lodash';

import {
  Editor as DraftJS,
  EditorState as DraftJSState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromHTML
} from 'draft-js';

import draftToHtml from 'draftjs-to-html';

import {
  AutoControlledComponent as Component,
  getElementType,
  getUnhandledProps,
  partitionFieldProps,
  classByKey
} from '../../lib';

import Field from '../Field';
import Icon from '../Icon';
import Popup from '../../modules/Popup';

export default class Editor extends Component {


  /* --------
   * Static Component Props
   * -------- */
  static propTypes = {
    /** User defined Classes */
    className: PropTypes.string,

    /** The Default Initial Value */
    defaultValue: PropTypes.oneOfType([
      PropTypes.instanceOf(DraftJSState),
      PropTypes.string
    ]),

    /** Set disabled state */
    disabled: PropTypes.bool,

    /** Max Tab Depth */
    maxTabDepth: PropTypes.number,

    /** onBlur handler function */
    onBlur: PropTypes.func,

    /** On Change function */
    onChange: PropTypes.func,

    /** On Focus Handler */
    onFocus: PropTypes.func,

    /** Placeholder Text */
    placeholder: PropTypes.string,

    /** Set editor as Readonly */
    readOnly: PropTypes.bool,

    /** Set TabIndex */
    tabIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /** The Editor Value */
    value: PropTypes.instanceOf(DraftJSState)
  };

  static defaultProps = {
    maxTabDepth: 4
  }

  static autoControlledProps = ['value'];

  static blockTypes = [
    [
      { text: 'H1', label: 'Titolo', style: 'header-one' },
      { text: 'H2', label: 'SottoTitolo', style: 'header-two' },
      { text: 'H3', label: 'Sezione', style: 'header-three' },
      { text: 'H4', label: 'SottoSezione', style: 'header-four' }
    ],
    [
      { icon: 'list ul', label: 'Elenco Puntato', style: 'unordered-list-item' },
      { icon: 'list ol', label: 'Elenco Numerato', style: 'ordered-list-item' }
    ]
  ]

  static inlineStyles = [
    [
      { icon: 'bold', label: 'Grassetto', style: 'BOLD' },
      { icon: 'italic', label: 'Corsivo', style: 'ITALIC' },
      { icon: 'underline', label: 'Sottolineato', style: 'UNDERLINE' }
    ]
  ]


  /* --------
   * Reference Object
   * -------- */
  editorRef = createRef();


  /* --------
   * State Definition
   * -------- */
  state = (() => {
    /** Get the Default Value, if Exists */
    const { defaultValue } = this.props;

    /** Get the Create Functions */
    const {
      createEmpty,
      createWithContent
    } = DraftJSState;

    /** If is already an instance of editor state, set it */
    if (defaultValue instanceof DraftJSState) {
      return { value: defaultValue };
    }

    /** If received prop is a string, must convert from HTML */
    if (isValidString(defaultValue)) {
      const blocksFromHTML = convertFromHTML(defaultValue);

      /** Create the New State */
      if (blocksFromHTML !== null) {
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

        return { value: createWithContent(state) };
      }
    }

    /** Else, create an empty Content */
    return { value: createEmpty() };
  })();


  /* --------
   * Input Props
   * -------- */
  getTabIndex = () => {
    const { disabled, tabIndex } = this.props;

    if (!_.isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
    return null;
  }


  /* --------
   * Helper Functions
   * -------- */
  focus = () => {
    _.invoke(this.editorRef.current, 'focus');
  }

  blur = () => {
    _.invoke(this.editorRef.current, 'blur');
  }

  getFormattedContent = () => {
    /** Get the current editor State */
    const { value: editorState } = this.state;

    /** Convert the Value to HTML */
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const rawHTML = draftToHtml(rawContent) ?? '';

    const html = rawHTML.charAt(rawHTML.length - 1) !== '>'
      ? rawHTML.substr(0, rawHTML.length - 1)
      : rawHTML;

    return {
      value     : editorState,
      htmlValue : html,
      rawValue  : rawContent
    };
  }

  getBlockStyle = block => block.getType()


  /* --------
   * Handler
   * -------- */
  handleChange = (editor) => {
    /** Get the onChange Props */
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(null, {
        ...this.props,
        ...this.getFormattedContent()
      });
    }

    this.trySetState({ value: editor });
  }

  handleFocus = (e) => {
    /** Get the onFocus Props */
    const { onFocus } = this.props;

    if (typeof onFocus === 'function') {
      /** Convert the value to HTML */
      onFocus(e, {
        ...this.props,
        ...this.getFormattedContent()
      });
    }
  }

  handleBlur = (e) => {
    /** Get the onBlur Props */
    const { onBlur } = this.props;

    if (typeof onBlur === 'function') {
      /** Convert the Value to HTML */
      onBlur(e, {
        ...this.props,
        ...this.getFormattedContent()
      });
    }
  }

  handleTab = (e) => {
    /** Prevent Default */
    e.preventDefault();

    /** Get Max Depth */
    const { maxTabDepth } = this.props;

    /** Get Editor State */
    const { value: editorState } = this.state;

    this.handleChange(RichUtils.onTab(e, editorState, maxTabDepth));
  }

  onKeyCommand = (command) => {
    /** Get the Editor State */
    const { value: editorState } = this.state;

    /** Compute the new State */
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.handleChange(newState);
      return true;
    }

    return false;
  }


  /* --------
   * Style Toggle
   * -------- */
  handleToggleInlineStyle = (style) => {
    /** Get the Editor State */
    const { value: editorState } = this.state;

    this.handleChange(RichUtils.toggleInlineStyle(editorState, style));
  }

  handleToggleBlockStyle = (style) => {
    /** Get the Editor State */
    const { value: editorState } = this.state;

    this.handleChange(RichUtils.toggleBlockType(editorState, style));
  }


  /* --------
   * Element Render
   * -------- */
  StyleButton = (props) => {
    const {
      onClick,
      active,
      style,
      label,
      text,
      icon
    } = props;

    const { disabled } = this.props;

    const handleClick = (e) => {
      e.preventDefault();
      if (!disabled) {
        onClick(style);
      }
    };

    const classes = cx(
      'editor-tool',
      classByKey(active, 'is-active')
    );

    const buttonElement = (
      <div className={classes} onClick={handleClick}>
        {icon ? <Icon name={icon} /> : text}
      </div>
    );

    return !disabled ? (
      <Popup
        trigger={buttonElement}
        content={label}
      />
    ) : buttonElement;
  }

  BlockStylesToolbar = () => {
    /** Get the Editor State */
    const { value: editorState } = this.state;

    /** Get actual selection */
    const selection = editorState.getSelection();

    /** Get the Current BlockType */
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    /** Get the Button Element */
    const { StyleButton } = this;

    /** Return the Toolbar */
    return (
      Editor.blockTypes.map((blockGroup, ix) => (
        <div key={ix} className='editor-tools'>
          {blockGroup.map(toggler => (
            <StyleButton
              key={toggler.label}
              active={blockType === toggler.style}
              onClick={this.handleToggleBlockStyle}
              {...toggler}
            />
          ))}
        </div>
      ))
    );
  }

  InlineStylesToolbar = () => {
    /** Get the Editor State */
    const { value: editorState } = this.state;

    /** Get the current style */
    const currentStyle = editorState.getCurrentInlineStyle();

    /** Get the Toggler */
    const { StyleButton } = this;

    return (
      Editor.inlineStyles.map((inlineStyleGroup, ix) => (
        <div key={ix} className='editor-tools'>
          {inlineStyleGroup.map(toggler => (
            <StyleButton
              key={toggler.label}
              active={currentStyle.has(toggler.style)}
              onClick={this.handleToggleInlineStyle}
              {...toggler}
            />
          ))}
        </div>
      ))
    );
  }


  /* --------
   * Main Render Function
   * -------- */
  render() {

    const {
      value
    } = this.state;

    const {
      className,
      disabled,
      placeholder,
      readOnly
    } = this.props;

    const classes = cx(
      'editor',
      classByKey(disabled, 'is-disabled'),
      classByKey(readOnly, 'is-readonly'),
      className
    );

    const rawRest = getUnhandledProps(Editor, this.props);
    const ElementType = getElementType(Editor, this.props);

    const [fieldProps, rest] = partitionFieldProps(rawRest);

    const {
      BlockStylesToolbar,
      InlineStylesToolbar
    } = this;

    return (
      <div onClick={() => this.focus()}>
        <Field {...fieldProps} form className={classes} as={ElementType}>

          {!readOnly && (
            <div className='editor-tools-wrapper'>
              <InlineStylesToolbar />

              <BlockStylesToolbar />
            </div>
          )}

          <DraftJS
            ref={this.editorRef}
            {...rest}
            tabIndex={this.getTabIndex()}
            blockStyleFn={this.getBlockStyle}
            placeholder={placeholder}
            editorState={value}
            readOnly={readOnly || disabled}
            handleKeyCommand={this.onKeyCommand}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onTab={this.handleTab}
          />
        </Field>
      </div>
    );
  }

}
