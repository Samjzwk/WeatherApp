import styles from './WeatherInformations.module.scss'

export const WeatherPrimaryInformations = ({description, actualCity, actualCountry, temp, onCLickModal}) => {

  const icofile = description.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={styles.informations}>
      <i className={styles.tempIco}><img src={`/weather/${icofile}.svg`} alt={description}/></i>
      <h2 className={styles.title}>{description}</h2>
      <h3 className={styles.subtitle}>{actualCity} - {actualCountry}</h3>
      <span className={styles.temperature}> {temp} °C</span>
      <div className={styles.locationWrapper} onClick={onCLickModal}>
      <img src={`/location.svg`} alt="location ico" className={styles.locationIco} /><span className={styles.location}>Change Location</span>
      </div>
    </div>
  );
}

export const WeatherExtraInformations = ({datas}) => {
  const extraItems = Object.keys(datas).map( item => {
    const icofile = item.replace(/\s+/g, '-').toLowerCase();
    return (<li className={styles.extraItems} key={item}>
        <i className={styles.extraIco}><img src={`/weather/${icofile}.svg`} alt={item} className="weatherico" /></i>
        <div className={styles.extraTexts}>
           <span className={styles.extraTitle}>{item}</span>
           <span className={styles.extraValue}>{datas[item]}</span>
        </div>
      </li>)
  });

  return (
    <ul className={styles.extraInformations}>
      {extraItems}
    </ul>
  );
}

export const WeatherForecast = ({weeks}) => {
  const forecastItems = weeks.map( item => {
    return (
      <li className={styles.forecastItems} key={item.dt}>
        <span className={styles.forecastDay}>{new Date(item.dt * 1000).toLocaleDateString('EN', { weekday: 'long' })}</span>
        <span className={styles.forecastValue}>{Math.round(item.temp.day - 273.15)}°C</span>
        <span className={styles.forecastFeelLike}>Feels like {Math.round(item.feels_like.day - 273.15)} °C</span>
      </li>
    )}
  );

  return (
    <ul className={styles.forecast}>
      {forecastItems}
    </ul>
  );
}
