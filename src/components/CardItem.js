import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  // Assuming `props.alt` is the description of the image. If not present, use a fallback description.
  const imageDescription = props.alt || 'Descriptive text here';

  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt={imageDescription} // Use `props.alt` or a default description
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
