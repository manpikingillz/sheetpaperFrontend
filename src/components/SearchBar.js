import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { classnames } from '../helpers';
// MapAutoComplete.css
import '../MapAutoComplete.css'
import '../App.css'
import Script from 'react-load-script'


class SearchBar extends React.Component {

    state ={ 
        errorMessage: '',
    }

    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
          clearSuggestions();
        });
      };

    

  render() {

    const {
      address,
      handleChange,
      handleSelect,
      placeholder,
      handleCloseClick,
      inputIconStyle,
      showCloseIcon
    } = this.props

    const { errorMessage } = this.state;

    const searchOptions = {

      types: ['(cities)'], //'establishment', '(cities)', '(regions)'
      componentRestrictions: {country: "ug"}
    }

    return (

      <div>
        <PlacesAutocomplete
          onChange={handleChange}
          value={address}
          onSelect={handleSelect}
          onError={this.handleError}
          searchOptions={searchOptions}
          // shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                  id={inputIconStyle}
                  style={{textIndent:'20px', height: '3em', borderRadius: '5px 5px 5px 5px', width: '95%', borderWidth: '1px', padding: '10px'}}
                  {...getInputProps({
                      placeholder: placeholder,
                      className: 'Demo__search-input',
                    })}
                  />
                  { showCloseIcon &&
                    <button
                      style={{marginRight: '15px'}}
                      className="Demo__clear-button"
                      onClick={handleCloseClick}
                    >
                      x
                    </button>
                  }
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                        <img
                          src={require('../powered_by_google_default.png')}
                          className="Demo__dropdown-footer-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>

        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

      </div>
    );
  }
}

export default SearchBar;