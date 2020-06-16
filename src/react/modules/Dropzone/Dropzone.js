import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import { will, isValidString, getRandomToken, isObject } from '@appbuckets/rabbit';

import DropzoneWrapper from 'react-dropzone';

import humanize from 'humanize-plus';

import {
  classByKey,
  getElementType,
  getUnhandledProps,
  childrenUtils,
  mimetypeToFontawesome
} from '../../lib';

import Divider from '../../elements/Divider';
import Icon from '../../elements/Icon';
import Input from '../../elements/Input';
import Loader from '../../elements/Loader';

import Layout from '../../collections/Layout';

import Popup from '../Popup';
import Button from '../../elements/Button';

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

    /** On Upload Handler */
    onUpload: PropTypes.func,

    /** Handler called when upload is finish */
    onUploadEnd: PropTypes.func,

    /** Change the show File UI */
    showFilesAs: PropTypes.oneOf(['icon', 'list']),

    /** Hide the Component without Unmount */
    visible: PropTypes.bool
  }

  static defaultProps = {
    multiple    : true,
    noClick     : false,
    noDrag      : false,
    showFilesAs : 'icon',
    visible     : true
  }


  /* --------
   * Useful Exported Function
   * -------- */
  static iconByFile = (file = {}) => mimetypeToFontawesome(file.mimetype)


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

  static FilesList = ({
    onDelete: handleDelete,
    onEdit: handleEdit,
    files,
    asList,
    ...rest
  }) => (
    <div className='dropzone-files'>
      {files.map(({ id, ...file }) => (
        <Dropzone.File
          key={id}
          {...rest}
          file={file}
          asList={asList}
          onEdit={(e, newName) => handleEdit(e, id, newName)}
          onDelete={e => handleDelete(e, id)}
        />
      ))}
    </div>
  )

  static File = ({
    onDelete: handleDelete,
    onEdit: handleEdit,
    file,
    asList,
    uploading,
    disabled,
    uploadError
  }) => {

    /** Bild File Class List */
    const classes = file.isImage
      ? cx(
        'file-preview-wrapper',
        'is-image',
        classByKey(file.width === file.height, 'is-square'),
        classByKey(file.width > file.height, 'is-horizontal'),
        classByKey(file.width < file.height, 'is-vertical')
      )
      : 'file-preview-wrapper';

    const [isPortalOpen, setPortalOpen] = useState(false);

    const [overwrittenFileName, setFileName] = useState(file.name);

    const handleInputChange = (e, { value }) => {
      setFileName(value);
    };

    const handleEditButtonClick = (e) => {
      handleEdit(e, overwrittenFileName);
      setPortalOpen(false);
    };

    const handleTriggerClick = (e) => {
      e.stopPropagation();
      setPortalOpen(true);
    };

    const handleOutsideClick = () => setPortalOpen(false);

    const hideTool = disabled || uploading || file.state.success;

    /** Build the Preview Element */
    const previewElement = (
      <div className={classes}>

        <div className='file-preview'>
          {file.preview
            ? <img src={file.preview} alt={file.name} />
            : <Icon name={file.icon} />}

          <Dropzone.FileState
            {...file.state}
            uploadError={uploadError}
          />
        </div>

        <div className='file-meta'>
          <span className='file-name'>{file.name}</span>
          <span className='file-size'>{humanize.fileSize(file.size)}</span>
        </div>

        {!hideTool && (
          <div className='file-tools'>
            <Popup
              open={isPortalOpen}
              basic={false}
              inverted={false}
              content={(
                <Input
                  key={1}
                  className='mb-0'
                  label='Nome File'
                  defaultValue={file.name}
                  action={{
                    primary : true,
                    icon    : 'save',
                    onClick : handleEditButtonClick
                  }}
                  actionPosition='right'
                  onChange={handleInputChange}
                />
              )}
              trigger={(
                <div className='file-tool file-edit' onClick={handleTriggerClick}>
                  <Icon name='edit' />
                </div>
              )}
              onOutsideClick={handleOutsideClick}
            />
            <div className='file-tool file-delete' onClick={handleDelete}>
              <Icon name='times' />
            </div>
          </div>
        )}

      </div>
    );

    /** Return the Component, based on asList prop */
    return asList
      ? previewElement
      : (
        <Popup
          position='bottom center'
          content={file.name}
          trigger={previewElement}
        />
      );

  }

  static FileState = ({ uploading, success, error, uploadError }) => {

    if (!uploading && !success && !error && !uploadError) {
      return null;
    }

    const classes = uploading ? 'file-state-wrapper' : cx(
      'file-state-wrapper',
      classByKey(success, 'is-success'),
      classByKey(error || uploadError, 'is-error')
    );

    return (
      <div className={classes}>
        <div className='file-state-container'>
          {
            (error || uploadError)
              ? <Icon size='big' name='times' />
              : uploading
                ? <Loader inverted active centered type='dots' size='small' />
                : <Icon size='big' name='check' />
          }
        </div>
      </div>
    );
  }


  /* --------
   * State Definition
   * -------- */
  state = {
    fileLoadError : false,
    files         : [],
    isUploading   : false,
    uploadError   : null
  }


  /* --------
   * Controller Function
   * -------- */
  clear = () => this.handleFileClear()


  /* --------
   * Custom Handler
   * -------- */
  handleFileDrop = async (blobs) => {

    /** While uploading, files could not be changed */
    const { isUploading } = this.state;

    if (isUploading) {
      return;
    }

    /** Build an Array to contain all reading promises */
    const readingPromises = [];

    blobs.forEach((blob) => {
      readingPromises.push(new Promise((resolveRead) => {

        /** Init the File Field */
        const file = {
          blob,
          _isDroppedFile : true,
          name           : blob.name,
          originalName   : blob.name,
          size           : blob.size,
          type           : isValidString(blob.type) ? blob.type : 'unknow',
          error          : false,
          preview        : null,
          icon           : '',
          id             : getRandomToken(14),
          isImage        : false,
          height         : 0,
          width          : 0,
          state          : {
            uploading : false,
            success   : false,
            error     : false
          }
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
      onDropEnd
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

      this.handleFilesChanged();
    });
  }

  handleFilesChanged = () => {
    const { files, isUploading } = this.state;

    /** While uploading, files could not be changed */
    if (isUploading) {
      return;
    }

    _.invoke(this.props, 'onFileChange', null, {
      ...this.props,
      files,
      value: files
    });
  }

  handleFileClear = (e) => {
    /** Calling the 'clear' function has no event, must use lodash to stop propagation */
    _.invoke(e, 'stopPropagation');

    /** While uploading, files could not be changed */
    const { isUploading } = this.state;

    if (isUploading) {
      return;
    }

    /** Purge Files List */
    this.setState({ files: [] }, this.handleFilesChanged);
  }

  handleFileEdit = (e, fileId, newName) => {
    /** Avoid the Event Propagation */
    e.stopPropagation();

    if (!isValidString(newName)) {
      return;
    }

    /** While uploading, files could not be changed */
    const { isUploading } = this.state;

    if (isUploading) {
      return;
    }

    this.setState(({ files }) => ({
      files: files.map((file) => {
        if (file.id === fileId) {
          file.name = newName;
        }

        return file;
      })
    }), this.handleFilesChanged);
  }

  handleFileDelete = (e, fileId) => {
    /** Avoid the Event Propagation */
    e.stopPropagation();

    /** While uploading, files could not be changed */
    const { isUploading } = this.state;

    if (isUploading) {
      return;
    }

    this.setState(({ files }) => ({
      files: files.filter(({ id }) => id !== fileId)
    }), this.handleFilesChanged);
  }

  handleFilesUpload = async (e) => {
    /** Avoid the Event Propagation */
    e.stopPropagation();

    /** Set the Uploading State */
    this.setState({
      isUploading : true,
      uploadError : false
    });

    /** Get the Upload Function */
    const { onUpload } = this.props;

    /** Get the Files List */
    const { files } = this.state;

    /** Await the onUpload function */
    const [err] = await will(onUpload(
      files.filter(({ state: { success } }) => !success),
      { setFileState: this.setFileState, removeFile: this.removeFile }
    ));

    /** Return to default state */
    this.setState({
      isUploading : false,
      uploadError : err !== null
    }, () => {
      const { files: newFiles } = this.state;

      _.invoke(this.props, 'onUploadEnd', newFiles.filter(({ state: { success } }) => success));
    });
  }

  setFileState = (__files, state) => {
    const _files = !Array.isArray(__files) ? [__files] : __files;

    /** Transform the files array */
    const filesState = _files.reduce((states, file) => {
      const fileId = isObject(file)
        ? file.id
        : isValidString(file)
          ? file
          : null;

      if (!fileId) {
        return states;
      }

      states[fileId] = state;

      return states;
    }, {});

    /** Set the new State */
    this.setState(({ files }) => ({
      files: files.map((file) => {

        if (isObject(filesState[file.id])) {
          file.state = {
            ...file.state,
            ...filesState[file.id]
          };
        }

        return file;
      })
    }));

  }

  removeFile = (__files) => {
    const _files = (!Array.isArray(__files) ? [__files] : __files)
      .map((file) => {
        const fileId = isObject(file)
          ? file.id
          : isValidString(file)
            ? file
            : null;

        return fileId;
      })
      .filter(isValidString);

    /** Set the new States, removing Files from Array */
    this.setState(({ files }) => ({
      files: files.filter(({ id }) => !_files.includes(id))
    }));
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
      noDrag,
      onUpload,
      showFilesAs
    } = this.props;


    /** Get States */
    const {
      fileLoadError,
      files,
      isUploading,
      uploadError
    } = this.state;

    /** Check how many uploadable files there are */
    const notUploadedFiles = files.filter(({ state: { success } }) => !success).length;

    /** Build Classlist */
    const classes = cx(
      'dropzone',
      classByKey(isFocused, 'is-focused'),
      classByKey(isFileDialogActive, 'is-choosing-file'),
      classByKey(isDragActive, 'is-dragging'),
      classByKey(isDragAccept, 'is-accepted'),
      classByKey(isDragReject, 'is-rejected'),
      classByKey(disabled || isUploading, 'is-disabled'),
      classByKey(!noClick, 'is-clickable'),
      classByKey(!noDrag, 'is-draggable'),
      classByKey(multiple, 'is-multiple'),
      classByKey(fileLoadError, 'is-error'),
      classByKey(files.length, 'has-files'),
      classByKey(showFilesAs === 'icon', 'files-icon-preview', 'files-list-preview'),
      classByKey(typeof onUpload === 'function', 'is-uploadable'),
      classByKey(isUploading, 'is-uploading'),
      classByKey(uploadError, 'has-upload-error'),
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
                  disabled={disabled}
                  uploading={isUploading}
                  uploadError={uploadError}
                  asList={showFilesAs === 'list'}
                  onEdit={this.handleFileEdit}
                  onDelete={this.handleFileDelete}
                />
              )}

              {!!files.length && typeof onUpload === 'function' && (
                <React.Fragment>

                  <Divider />

                  <Layout.Row>
                    <Layout.Column
                      textAlign='center'
                      content={(
                        <React.Fragment>
                          <Button
                            primary
                            disabled={disabled || isUploading || notUploadedFiles === 0}
                            loading={isUploading}
                            icon='file upload'
                            content='Invia'
                            onClick={this.handleFilesUpload}
                          />
                          <Button
                            flat
                            disabled={disabled || isUploading}
                            icon='times'
                            content='Pulisci'
                            onClick={this.handleFileClear}
                          />
                        </React.Fragment>
                      )}
                    />
                  </Layout.Row>

                </React.Fragment>
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

    const {
      isUploading
    } = this.state;

    /** Render the Wrapper */
    return (
      <DropzoneWrapper
        disabled={disabled || isUploading}
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