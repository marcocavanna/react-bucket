import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { components } from 'react-select';

import { isValidString, will, isObject } from '@appbuckets/rabbit';

import Item from '../Item';
import Select from '../Select';

import {
  AutoControlledComponent as Component,
  getUnhandledProps
} from '../../lib';

const getAddressComponent = addressComponent => (comp, field = 'long_name') => (
  addressComponent.find(c => c.types.includes(comp))?.[field]
);

// eslint-disable-next-line react/require-optimization
class GooglePlacesAutocomplete extends Component {

  static autoControlledProps = ['value'];

  static propTypes = {

    debounceTime: PropTypes.number,

    defaultValue: PropTypes.object,

    minInputValueLength: PropTypes.number,

    onChange: PropTypes.func,

    onInputChange: PropTypes.func,

    value: PropTypes.object

  }

  static defaultProps = {
    debounceTime        : 600,
    minInputValueLength : 3
  }

  static PlaceOption = (props) => {
    const { children, ...rest } = props;

    const { data: {
      structured_formatting: {
        main_text,
        secondary_text
      }
    } } = rest;

    return (
      <components.Option {...rest}>
        <Item
          header={main_text}
          content={secondary_text}
        />
      </components.Option>
    );
  }

  _freshState = () => ({
    isLoading   : false,
    suggestions : [],
    error       : null
  })

  state = (() => ({
    ...this._freshState(),
    placeEnabled : true,
    inputValue   : ''
  }))();

  componentDidMount() {
    this.initalizeService();
  }

  initalizeService = () => {

    if (!window.google?.maps?.places) {
      window.console.error('[ ReactBucket Place ] : Google maps places script not loaded!');
      this.setState({
        placeEnabled: false
      });
      return;
    }

    this.placeService = new window.google.maps.places.AutocompleteService();

    this.geocoderService = new window.google.maps.Geocoder();
  }

  getPlaceDetails = placeId => new Promise((resolve, reject) => {

    this.geocoderService.geocode({ placeId }, (details, status) => {

      const { GeocoderStatus } = window.google.maps;

      if (status === GeocoderStatus.NOT_FOUND || status === GeocoderStatus.ZERO_RESULTS) {
        return resolve(null);
      }

      if (status !== GeocoderStatus.OK || !Array.isArray(details)) {
        return reject(status);
      }

      return resolve(details[0]);
    });

  });

  getPredictions = () => new Promise((resolve, reject) => {

    const { inputValue } = this.state;

    if (!isValidString(inputValue)) {
      return resolve([]);
    }

    return this.placeService.getPlacePredictions({
      input : inputValue,
      types : ['geocode']
    }, (places, status) => {

      const { PlacesServiceStatus } = window.google.maps.places;

      if (status === PlacesServiceStatus.NOT_FOUND || status === PlacesServiceStatus.ZERO_RESULTS) {
        return resolve([]);
      }

      if (status !== PlacesServiceStatus.OK || !Array.isArray(places)) {
        return reject(status);
      }
      return resolve(places);
    });

  });

  loadData = async () => {
    const { placeEnabled, isLoading } = this.state;

    if (!placeEnabled) {
      return;
    }

    if (!isLoading) {
      this.setState({
        isLoading: true
      });
    }

    const [err, data] = await will(this.getPredictions());

    if (err) {
      this.setState({
        ...this._freshState(),
        error: err
      });
    }

    this.setState({
      ...this._freshState(),
      suggestions: data
    });
  }

  // eslint-disable-next-line react/destructuring-assignment
  debouncedLoadData = _.debounce(this.loadData, this.props.debounceTime);

  handleInputValueChanged = (value) => {

    const { minInputValueLength } = this.props;

    /** If value is not a string, or length is not lengthy, purge the state */
    if (!isValidString(value) || value.length < minInputValueLength) {
      this.setState({
        ...this._freshState(),
        inputValue: value
      });
      return;
    }

    /** Invoke the OnChange Function */
    _.invoke(this.props, 'onChange', value, this.props);

    /** Else, update the filters */
    this.setState({
      ...this._freshState(),
      isLoading  : true,
      inputValue : value
    }, this.debouncedLoadData);
  }

  handlePlaceChanged = async (place) => {

    if (!isObject(place)) {
      this.trySetState({ value: null });
      return;
    }

    const [err, details] = await will(this.getPlaceDetails(place.place_id));

    if (err) {
      this.trySetState({ value: null }, {
        ...this._freshState(),
        error: err
      });
      return;
    }

    const {
      address_components,
      place_id          : placeId,
      formatted_address : formattedAddress,
      geometry          : {
        location
      }
    } = details;

    const addressComponent = getAddressComponent(address_components);

    const value = {
      placeId,
      formattedAddress,
      address: {
        route       : addressComponent('route'),
        city        : addressComponent('locality'),
        state       : addressComponent('administrative_area_level_1'),
        stateCode   : addressComponent('administrative_area_level_2', 'short_name'),
        country     : addressComponent('country'),
        postalCode  : addressComponent('postal_code'),
        countryCode : addressComponent('country', 'short_name')
      },
      position: {
        lat : location.lat(),
        lng : location.lng()
      }
    };

    _.invoke(this.props, 'onChange', value, this.props);

    this.trySetState({ value });

  }

  /** Render the selector */
  render() {

    const {
      placeEnabled,
      inputValue,
      isLoading,
      error,
      suggestions
    } = this.state;

    const rest = getUnhandledProps(GooglePlacesAutocomplete, this.props);

    return (
      <Select
        {...rest}
        components={{
          Option: GooglePlacesAutocomplete.PlaceOption
        }}
        error={error}
        disabled={!placeEnabled}
        inputValue={inputValue}
        loading={isLoading}
        options={suggestions}
        getOptionLabel={option => option.description}
        getOptionValue={option => option.place_id}
        filterOption={() => true}
        onChange={this.handlePlaceChanged}
        onInputChange={this.handleInputValueChanged}
      />
    );

  }

}

export default GooglePlacesAutocomplete;
