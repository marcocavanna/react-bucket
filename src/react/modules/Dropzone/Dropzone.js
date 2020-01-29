import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { will, isValidString, getRandomToken } from '@appbuckets/rabbit';

import DropzoneWrapper from 'react-dropzone';

import humanize from 'humanize-plus';

import {
  classByKey,
  getElementType,
  getUnhandledProps,
  childrenUtils,
  mimetypeToFontawesome
} from '../../lib';

import Icon from '../../elements/Icon';
import Popup from '../Popup';

export default class Dropzone extends React.Component {


  /* --------
   * Static Component Props
   * -------- */
  static propTypes = {
    /** An element used to show the Component */
    as: PropTypes.elementType,

    /** User defined Classes */
    className: PropTypes.string,

    /** Disable the Dropzone Component */
    disabled: PropTypes.bool,

    /** Accept Multiple Files */
    multiple: PropTypes.bool,

    /** Disable Click Event */
    noClick: PropTypes.bool,

    /** Disable Drop Event */
    noDrag: PropTypes.bool,

    /** Override Default Drop Event */
    onDrop: PropTypes.func,

    /** Attach a Function after drop is completed */
    onDropEnd: PropTypes.func,

    /** On File Change handler */
    onFileChange: PropTypes.func,

    /** Hide the Component without Unmount */
    visible: PropTypes.bool
  }

  static defaultProps = {
    multiple : true,
    noClick  : false,
    noDrag   : false,
    visible  : true
  }


  /* --------
   * Internal Component
   * -------- */
  static HiddenInput = props => (
    <div className='dropzone-input'>
      <input {...props} />
    </div>
  )

  static Hint = ({ isDragActive, disabled }) => (
    <div className='dropzone-hint'>
      <Icon
        className='dropzone-icon'
        name={isDragActive ? 'file download' : 'cloud upload alt'}
      />

      <div className='dropzone-title'>
        File Upload
      </div>

      <div className='dropzone-message'>
        {
          disabled
            ? 'Upload Disabilitato'
            : isDragActive
              ? 'Rilascia i file qui'
              : 'Trascina o Clicca per selezionare un File'
        }
      </div>
    </div>
  )

  static Content = ({ children, content }) => (
    <div className='dropzone-content'>
      {childrenUtils.isNil(children) ? content : children}
    </div>
  )

  static FilesList = ({ files, onDelete: handleDelete }) => (
    <div className='dropzone-files'>
      {files.map(({ id, ...file }) => (
        <Dropzone.File
          key={id}
          file={file}
          onDelete={e => handleDelete(e, id)}
        />
      ))}
    </div>
  )

  static File = ({ file, onDelete: handleDelete }) => {

    const classes = file.isImage
      ? cx(
        'file-preview-wrapper',
        'is-image',
        classByKey(file.width === file.height, 'is-square'),
        classByKey(file.width > file.height, 'is-horizontal'),
        classByKey(file.width < file.height, 'is-vertical')
      )
      : 'file-preview-wrapper';

    return (
      <Popup
        position='bottom center'
        content={file.name}
        trigger={(
          <div className={classes}>
            <div className='file-delete' onClick={handleDelete}>
              <Icon name='times' />
            </div>
            <div className='file-preview'>
              {file.preview
                ? <img src={file.preview} alt={file.name} />
                : <Icon name={file.icon} />}
            </div>
            <div className='file-meta'>
              <span className='file-name'>{file.name}</span>
              <span className='file-size'>{humanize.fileSize(file.size)}</span>
            </div>
          </div>
        )}
      />
    );

  }


  /* --------
   * State Definition
   * -------- */
  state = {
    fileLoadError : false,
    files         : []
  }


  /* --------
   * Controller Function
   * -------- */
  clear = () => {
    this.setState({ files: [] }, () => {
      const { onFileChange } = this.props;

      if (typeof onFileChange === 'function') {
        onFileChange(null, { ...this.props, files: [], value: [] });
      }
    });
  }


  /* --------
   * Custom Handler
   * -------- */
  handleFileDrop = async (blobs) => {

    /** Build an Array to contain all reading promises */
    const readingPromises = [];

    blobs.forEach((blob) => {
      readingPromises.push(new Promise((resolveRead) => {

        /** Init the File Field */
        const file = {
          blob,
          name    : blob.name,
          size    : blob.size,
          type    : isValidString(blob.type) ? blob.type : 'unknow',
          error   : false,
          preview : null,
          icon    : '',
          id      : getRandomToken(14),
          isImage : false,
          height  : 0,
          width   : 0
        };

        /** Assign the Icon */
        file.icon = mimetypeToFontawesome(file.type);

        /** If file is not an Image, resolve */
        if (!/^image\//.test(blob.type)) {
          return resolveRead(file);
        }

        /** Set image field */
        file.isImage = true;

        /** Init a new File Reader */
        const reader = new FileReader();

        /** Init an Aborting Function */
        const abortedReader = () => {
          file.error = true;
          return resolveRead(file);
        };

        /** Attach Events to Reader */
        reader.onabort = abortedReader;
        reader.onerror = abortedReader;

        reader.onload = (e) => {
          file.preview = e.target.result;

          /** Read Image Size */
          const img = new Image();

          img.src = e.target.result;

          img.onabort = abortedReader;
          img.onerror = abortedReader;

          img.onload = () => {
            file.width = img.width;
            file.height = img.height;
            return resolveRead(file);
          };
        };

        /** Read the File */
        return reader.readAsDataURL(blob);
      }));
    });

    /** Await the Promise Resolution */
    const [err, files] = await will(readingPromises);

    /** If an onDrop function exists, pass the Files */
    const {
      onDrop,
      onDropEnd,
      onFileChange
    } = this.props;

    if (typeof onDrop === 'function') {
      onDrop(err, files);
      return;
    }

    /** Else, set the new State with received files */
    this.setState({
      fileLoadError: !!err,
      files
    }, () => {
      /** Once new State has been setted, call the onDropEnd */
      if (typeof onDropEnd === 'function') {
        onDropEnd(err, files);
      }

      if (typeof onFileChange === 'function') {
        onFileChange(null, { ...this.props, files, value: files });
      }
    });
  }

  handleFileDelete = (e, fileId) => {
    /** Avoid the Event Propagation */
    e.stopPropagation();

    this.setState(({ files }) => ({
      files: files.filter(({ id }) => id !== fileId)
    }), () => {
      const { onFileChange } = this.state;
      const { files } = this.state;

      if (typeof onFileChange === 'function') {
        onFileChange(null, { ...this.props, files, value: files });
      }
    });
  }


  /* --------
   * Component Render Function
   * -------- */
  renderDropzoneContent = (dropzoneProps) => {

    /** Get Dropzone Wrapper Props */
    const {
      isFocused,
      isFileDialogActive,
      isDragActive,
      isDragAccept,
      isDragReject,
      getRootProps,
      getInputProps
    } = dropzoneProps;


    /** Get Component Props */
    const {
      className,
      disabled,
      multiple,
      noClick,
      noDrag
    } = this.props;


    /** Get States */
    const {
      fileLoadError,
      files
    } = this.state;


    /** Build Classlist */
    const classes = cx(
      'dropzone',
      classByKey(isFocused, 'is-focused'),
      classByKey(isFileDialogActive, 'is-choosing-file'),
      classByKey(isDragActive, 'is-dragging'),
      classByKey(isDragAccept, 'is-accepted'),
      classByKey(isDragReject, 'is-rejected'),
      classByKey(disabled, 'is-disabled'),
      classByKey(!noClick, 'is-clickable'),
      classByKey(!noDrag, 'is-draggable'),
      classByKey(multiple, 'is-multiple'),
      classByKey(fileLoadError, 'is-error'),
      classByKey(files.length, 'has-files'),
      className
    );


    /** Get Element Type and Rests */
    const ElementType = getElementType(Dropzone, this.props);
    const rest = getUnhandledProps(Dropzone, this.props);

    /** Render the Component */
    return (
      <ElementType {...rest} {...getRootProps()} className={classes}>

        {/* Render the Hidden File Input */}
        <div className='dropzone-input'>
          <input {...getInputProps()} />
        </div>

        <Dropzone.Content
          content={(
            <React.Fragment>

              {(!files.length && (
                <Dropzone.Hint isDragActive={isDragActive} disabled={disabled} />
              )) || (
                <Dropzone.FilesList
                  files={files}
                  onDelete={this.handleFileDelete}
                />
              )}

            </React.Fragment>
          )}
        />

      </ElementType>
    );
  }


  /* --------
   * Main Render Function
   *
   * The Render function will only
   * render the Dropzone Wrapper
   * and delegate the render to the
   * renderComponent function
   * -------- */
  render() {

    /** Get the Props */
    const {
      disabled,
      multiple,
      noClick,
      noDrag,
      visible
    } = this.props;

    if (!visible) {
      return null;
    }

    /** Render the Wrapper */
    return (
      <DropzoneWrapper
        disabled={disabled}
        multiple={multiple}
        noClick={noClick}
        noDrag={noDrag}
        onDrop={this.handleFileDrop}
      >
        {this.renderDropzoneContent}
      </DropzoneWrapper>
    );

  }

}
