import styles from './SearchModal.module.scss';
import { Fragment, useState } from 'react';

function SearchModal({citySearch, setCitySearch, searchWeatherCity}) {

  const handleKeyPress = (evt) => evt.charCode === 13 ? searchWeatherCity() : '';

  return (
    <Fragment>
      <input id="search-city" 
      name="search-city" 
      autoComplete="off"
      className={styles.searchCity} 
      placeholder="City" 
      value={citySearch} 
      onChange={e => setCitySearch(e.target.value)}
      onKeyPress={(e) => handleKeyPress(e)}/>
      <label className={styles.overlayCity} htmlFor="search-city" onClick={searchWeatherCity}/>
    </Fragment>
  );
}

export default SearchModal;
